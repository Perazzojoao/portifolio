const GITHUB_API_BASE_URL = 'https://api.github.com'
const GITHUB_GRAPHQL_API_URL = 'https://api.github.com/graphql'
const GITHUB_API_VERSION = '2022-11-28'

export const GITHUB_USERNAME = 'Perazzojoao'
export const GITHUB_LANGUAGE_OTHERS_KEY = '__others__'

const GITHUB_REPO_LIMIT = 5
const GITHUB_PINNED_LIMIT = 6
const GITHUB_PINNED_LANGUAGE_LIMIT = 8
const GITHUB_EVENT_PAGE_SIZE = 100
const GITHUB_MAX_EVENT_PAGES = 3
const GITHUB_REPOSITORY_PAGE_SIZE = 100
const GITHUB_MAX_REPOSITORY_PAGES = 10
const GITHUB_TOP_LANGUAGE_LIMIT = 5
const GITHUB_REST_LANGUAGE_BATCH_SIZE = 8
const GITHUB_REVALIDATE_SECONDS = 60 * 60
const GITHUB_LANGUAGE_SHARE_SCORE_WEIGHT = 0.7
const GITHUB_LANGUAGE_REPOSITORY_PRESENCE_WEIGHT = 0.3

type GitHubPushEvent = {
	type: string
	created_at: string
	repo?: {
		name: string
	}
	payload?: {
		size?: number
	}
}

type GitHubCommitSearchResponse = {
	items?: GitHubCommitSearchItem[]
}

type GitHubCommitSearchItem = {
	repository?: {
		full_name?: string
	}
	commit?: {
		author?: {
			date?: string
		}
	}
}

type GitHubRepositoryResponse = {
	id: number
	name: string
	full_name: string
	html_url: string
	description: string | null
	stargazers_count: number
	forks_count: number
	fork?: boolean
}

type GitHubLanguageBytesResponse = Record<string, number>

type GitHubGraphQLResponse<T> = {
	data?: T
	errors?: unknown[]
}

type GitHubPinnedItemsGraphQLResponse = {
	user?: {
		pinnedItems?: {
			nodes?: Array<GitHubPinnedRepositoryNode | null> | null
		} | null
	} | null
}

type GitHubPublicRepositoriesLanguagesGraphQLResponse = {
	user?: {
		repositories?: {
			nodes?: Array<GitHubPublicRepositoryNode | null> | null
			pageInfo?: {
				hasNextPage?: boolean | null
				endCursor?: string | null
			} | null
		} | null
	} | null
}

type GitHubPublicRepositoryNode = {
	languages?: {
		edges?: Array<GitHubPinnedRepositoryLanguageEdge | null> | null
	} | null
}

type GitHubPinnedRepositoryNode = {
	id: string
	name: string
	nameWithOwner: string
	description: string | null
	url: string
	stargazerCount: number
	forkCount: number
	pushedAt: string | null
	languages?: {
		edges?: Array<GitHubPinnedRepositoryLanguageEdge | null> | null
	} | null
}

type GitHubPinnedRepositoryLanguageEdge = {
	size: number
	node?: {
		name?: string | null
	} | null
}

type RecentPushRepository = {
	fullName: string
	pushedAt: string
	recentCommitCount: number
}

export type GitHubLanguageStat = {
	name: string
	bytes: number
	percentage: number
}

export type GitHubRepository = {
	id: number
	name: string
	fullName: string
	description: string | null
	url: string
	stars: number
	forks: number
	pushedAt: string
	recentCommitCount: number
	languages: GitHubLanguageStat[]
}

export type GitHubPinnedRepository = {
	id: string
	name: string
	fullName: string
	description: string | null
	url: string
	stars: number
	forks: number
	pushedAt: string
	languages: GitHubLanguageStat[]
}

export type GitHubLanguageDistribution = {
	topLanguages: GitHubLanguageStat[]
	repositoryCount: number
	totalBytes: number
}

export type GitHubActivity = {
	username: string
	repositories: GitHubRepository[]
	pinnedRepositories: GitHubPinnedRepository[]
	languageDistribution: GitHubLanguageDistribution
}

type GitHubLanguageUsageAccumulator = {
	bytesByLanguage: Map<string, number>
	normalizedShareByLanguage: Map<string, number>
	presenceByLanguage: Map<string, number>
	repositoryCount: number
}

const PINNED_REPOSITORIES_QUERY = `
	query PinnedRepositories($username: String!, $limit: Int!, $languagesLimit: Int!) {
		user(login: $username) {
			pinnedItems(first: $limit, types: [REPOSITORY]) {
				nodes {
					... on Repository {
						id
						name
						nameWithOwner
						description
						url
						stargazerCount
						forkCount
						pushedAt
						languages(first: $languagesLimit, orderBy: { field: SIZE, direction: DESC }) {
							edges {
								size
								node {
									name
								}
							}
						}
					}
				}
			}
		}
	}
`

const PUBLIC_REPOSITORIES_LANGUAGES_QUERY = `
	query PublicRepositoriesLanguages($username: String!, $first: Int!, $after: String, $languagesLimit: Int!) {
		user(login: $username) {
			repositories(
				first: $first
				after: $after
				privacy: PUBLIC
				isFork: false
				ownerAffiliations: [OWNER]
				orderBy: { field: PUSHED_AT, direction: DESC }
			) {
				nodes {
					languages(first: $languagesLimit, orderBy: { field: SIZE, direction: DESC }) {
						edges {
							size
							node {
								name
							}
						}
					}
				}
				pageInfo {
					hasNextPage
					endCursor
				}
			}
		}
	}
`

function toGitHubUrl(path: string): string {
	if (path.startsWith('http://') || path.startsWith('https://')) {
		return path
	}

	return `${GITHUB_API_BASE_URL}${path}`
}

function createGitHubHeaders(token?: string, initHeaders?: HeadersInit): Headers {
	const headers = new Headers(initHeaders)

	headers.set('Accept', 'application/vnd.github+json')
	headers.set('X-GitHub-Api-Version', GITHUB_API_VERSION)

	if (token) {
		headers.set('Authorization', `Bearer ${token}`)
	}

	return headers
}

async function fetchGitHubJson<T>(path: string, token?: string, init?: RequestInit): Promise<T | null> {
	try {
		const cacheMode = init?.cache ?? 'force-cache'
		const shouldUseNextCache = cacheMode !== 'no-store'

		const response = await fetch(toGitHubUrl(path), {
			...init,
			headers: createGitHubHeaders(token, init?.headers),
			cache: cacheMode,
			next: shouldUseNextCache
				? {
						revalidate: GITHUB_REVALIDATE_SECONDS,
						tags: ['github-activity'],
					}
				: undefined,
		})

		if (!response.ok) {
			return null
		}

		return (await response.json()) as T
	} catch {
		return null
	}
}

async function fetchGitHubGraphQL<T>(
	query: string,
	variables: Record<string, unknown>,
	token?: string,
): Promise<T | null> {
	if (!token) {
		return null
	}

	try {
		const response = await fetch(GITHUB_GRAPHQL_API_URL, {
			method: 'POST',
			headers: createGitHubHeaders(token, {
				'Content-Type': 'application/json',
			}),
			body: JSON.stringify({ query, variables }),
			cache: 'force-cache',
			next: {
				revalidate: GITHUB_REVALIDATE_SECONDS,
				tags: ['github-activity'],
			},
		})

		if (!response.ok) {
			return null
		}

		const payload = (await response.json()) as GitHubGraphQLResponse<T>

		if (Array.isArray(payload.errors) && payload.errors.length > 0) {
			return null
		}

		return payload.data ?? null
	} catch {
		return null
	}
}

function toLanguageStats(data: GitHubLanguageBytesResponse): GitHubLanguageStat[] {
	const entries = Object.entries(data).sort((a, b) => b[1] - a[1])

	return toLanguageStatsFromEntries(entries)
}

function toLanguageStatsFromEntries(entries: Array<[string, number]>): GitHubLanguageStat[] {
	const totalBytes = entries.reduce((sum, [, value]) => sum + value, 0)

	if (totalBytes === 0) {
		return []
	}

	return entries.map(([name, bytes]) => ({
		name,
		bytes,
		percentage: Number(((bytes / totalBytes) * 100).toFixed(1)),
	}))
}

function createEmptyLanguageDistribution(): GitHubLanguageDistribution {
	return {
		topLanguages: [],
		repositoryCount: 0,
		totalBytes: 0,
	}
}

function createLanguageUsageAccumulator(): GitHubLanguageUsageAccumulator {
	return {
		bytesByLanguage: new Map<string, number>(),
		normalizedShareByLanguage: new Map<string, number>(),
		presenceByLanguage: new Map<string, number>(),
		repositoryCount: 0,
	}
}

function mergeLanguageBytes(target: Map<string, number>, languageBytes: GitHubLanguageBytesResponse): void {
	for (const [name, bytes] of Object.entries(languageBytes)) {
		target.set(name, (target.get(name) ?? 0) + bytes)
	}
}

function mergeLanguageEdges(
	target: Map<string, number>,
	edges: Array<GitHubPinnedRepositoryLanguageEdge | null> | null | undefined,
): void {
	if (!edges || edges.length === 0) {
		return
	}

	for (const edge of edges) {
		const name = edge?.node?.name

		if (!name) {
			continue
		}

		target.set(name, (target.get(name) ?? 0) + edge.size)
	}
}

function registerRepositoryLanguageSample(
	usageAccumulator: GitHubLanguageUsageAccumulator,
	repositoryLanguageBytes: Map<string, number>,
): void {
	if (repositoryLanguageBytes.size === 0) {
		return
	}

	const totalBytes = Array.from(repositoryLanguageBytes.values()).reduce((sum, bytes) => sum + bytes, 0)

	if (totalBytes <= 0) {
		return
	}

	usageAccumulator.repositoryCount += 1

	for (const [name, bytes] of repositoryLanguageBytes.entries()) {
		if (bytes <= 0) {
			continue
		}

		usageAccumulator.bytesByLanguage.set(name, (usageAccumulator.bytesByLanguage.get(name) ?? 0) + bytes)

		const normalizedShare = bytes / totalBytes
		usageAccumulator.normalizedShareByLanguage.set(
			name,
			(usageAccumulator.normalizedShareByLanguage.get(name) ?? 0) + normalizedShare,
		)

		usageAccumulator.presenceByLanguage.set(name, (usageAccumulator.presenceByLanguage.get(name) ?? 0) + 1)
	}
}

function toLanguageDistribution(usageAccumulator: GitHubLanguageUsageAccumulator): GitHubLanguageDistribution {
	if (usageAccumulator.repositoryCount === 0) {
		return {
			topLanguages: [],
			repositoryCount: 0,
			totalBytes: 0,
		}
	}

	const totalBytes = Array.from(usageAccumulator.bytesByLanguage.values()).reduce((sum, bytes) => sum + bytes, 0)
	const languageNames = new Set<string>([
		...usageAccumulator.bytesByLanguage.keys(),
		...usageAccumulator.normalizedShareByLanguage.keys(),
		...usageAccumulator.presenceByLanguage.keys(),
	])

	const languageScores: Array<{ name: string; bytes: number; score: number }> = []

	for (const languageName of languageNames) {
		const normalizedShareScore = usageAccumulator.normalizedShareByLanguage.get(languageName) ?? 0
		const repositoryPresenceScore = usageAccumulator.presenceByLanguage.get(languageName) ?? 0

		const score =
			normalizedShareScore * GITHUB_LANGUAGE_SHARE_SCORE_WEIGHT +
			repositoryPresenceScore * GITHUB_LANGUAGE_REPOSITORY_PRESENCE_WEIGHT

		if (score <= 0) {
			continue
		}

		languageScores.push({
			name: languageName,
			bytes: usageAccumulator.bytesByLanguage.get(languageName) ?? 0,
			score,
		})
	}

	if (languageScores.length === 0) {
		return {
			topLanguages: [],
			repositoryCount: usageAccumulator.repositoryCount,
			totalBytes,
		}
	}

	languageScores.sort((a, b) => b.score - a.score)

	const totalScore = languageScores.reduce((sum, entry) => sum + entry.score, 0)

	if (totalScore <= 0) {
		return {
			topLanguages: [],
			repositoryCount: usageAccumulator.repositoryCount,
			totalBytes,
		}
	}

	const topLanguageScores = languageScores.slice(0, GITHUB_TOP_LANGUAGE_LIMIT)
	const otherLanguageScores = languageScores.slice(GITHUB_TOP_LANGUAGE_LIMIT)
	const otherScore = otherLanguageScores.reduce((sum, entry) => sum + entry.score, 0)
	const otherBytes = otherLanguageScores.reduce((sum, entry) => sum + entry.bytes, 0)

	if (otherScore > 0) {
		topLanguageScores.push({
			name: GITHUB_LANGUAGE_OTHERS_KEY,
			bytes: otherBytes,
			score: otherScore,
		})
	}

	const topLanguages: GitHubLanguageStat[] = topLanguageScores.map(language => ({
		name: language.name,
		bytes: language.bytes,
		percentage: Number(((language.score / totalScore) * 100).toFixed(1)),
	}))

	return {
		topLanguages,
		repositoryCount: usageAccumulator.repositoryCount,
		totalBytes,
	}
}

function toPinnedLanguageStats(
	edges: Array<GitHubPinnedRepositoryLanguageEdge | null> | null | undefined,
): GitHubLanguageStat[] {
	if (!edges || edges.length === 0) {
		return []
	}

	const languageBytes = new Map<string, number>()

	for (const edge of edges) {
		const name = edge?.node?.name

		if (!name) {
			continue
		}

		languageBytes.set(name, (languageBytes.get(name) ?? 0) + edge.size)
	}

	const entries = Array.from(languageBytes.entries()).sort((a, b) => b[1] - a[1])

	return toLanguageStatsFromEntries(entries)
}

function parseGitHubDate(date: string): number {
	const timestamp = Date.parse(date)

	return Number.isNaN(timestamp) ? 0 : timestamp
}

async function getRecentPushRepositories(username: string, token?: string): Promise<RecentPushRepository[]> {
	const repositories = new Map<string, RecentPushRepository>()
	const commitSearchParams = new URLSearchParams({
		q: `author:${username} is:public`,
		sort: 'author-date',
		order: 'desc',
		per_page: String(GITHUB_EVENT_PAGE_SIZE),
	})

	for (let page = 1; page <= GITHUB_MAX_EVENT_PAGES; page += 1) {
		const params = new URLSearchParams(commitSearchParams)
		params.set('page', String(page))

		const response = await fetchGitHubJson<GitHubCommitSearchResponse>(`/search/commits?${params.toString()}`, token)
		const items = response?.items ?? []

		if (items.length === 0) {
			break
		}

		for (const item of items) {
			const fullName = item.repository?.full_name
			const pushedAt = item.commit?.author?.date

			if (!fullName || repositories.has(fullName)) {
				continue
			}

			repositories.set(fullName, {
				fullName,
				pushedAt: pushedAt ?? new Date(0).toISOString(),
				recentCommitCount: 0,
			})

			if (repositories.size >= GITHUB_REPO_LIMIT) {
				break
			}
		}

		if (repositories.size >= GITHUB_REPO_LIMIT) {
			break
		}
	}

	if (repositories.size < GITHUB_REPO_LIMIT) {
		for (let page = 1; page <= GITHUB_MAX_EVENT_PAGES; page += 1) {
			const events = await fetchGitHubJson<GitHubPushEvent[]>(
				`/users/${username}/events/public?per_page=${GITHUB_EVENT_PAGE_SIZE}&page=${page}`,
				token,
			)

			if (!events || events.length === 0) {
				break
			}

			for (const event of events) {
				if (event.type !== 'PushEvent' || !event.repo?.name || repositories.has(event.repo.name)) {
					continue
				}

				repositories.set(event.repo.name, {
					fullName: event.repo.name,
					pushedAt: event.created_at,
					recentCommitCount: event.payload?.size ?? 0,
				})

				if (repositories.size >= GITHUB_REPO_LIMIT) {
					break
				}
			}

			if (repositories.size >= GITHUB_REPO_LIMIT) {
				break
			}
		}
	}

	return Array.from(repositories.values())
		.sort((a, b) => parseGitHubDate(b.pushedAt) - parseGitHubDate(a.pushedAt))
		.slice(0, GITHUB_REPO_LIMIT)
}

async function getRepositoryActivity(pushData: RecentPushRepository, token?: string): Promise<GitHubRepository | null> {
	const [repo, languageBytes] = await Promise.all([
		fetchGitHubJson<GitHubRepositoryResponse>(`/repos/${pushData.fullName}`, token),
		fetchGitHubJson<GitHubLanguageBytesResponse>(`/repos/${pushData.fullName}/languages`, token),
	])

	if (!repo) {
		return null
	}

	return {
		id: repo.id,
		name: repo.name,
		fullName: repo.full_name,
		description: repo.description,
		url: repo.html_url,
		stars: repo.stargazers_count,
		forks: repo.forks_count,
		pushedAt: pushData.pushedAt,
		recentCommitCount: pushData.recentCommitCount,
		languages: toLanguageStats(languageBytes ?? {}),
	}
}

async function getPublicRepositories(username: string, token?: string): Promise<GitHubRepositoryResponse[]> {
	const repositories: GitHubRepositoryResponse[] = []

	for (let page = 1; page <= GITHUB_MAX_REPOSITORY_PAGES; page += 1) {
		const params = new URLSearchParams({
			type: 'owner',
			sort: 'pushed',
			direction: 'desc',
			per_page: String(GITHUB_REPOSITORY_PAGE_SIZE),
			page: String(page),
		})

		const response = await fetchGitHubJson<GitHubRepositoryResponse[]>(
			`/users/${username}/repos?${params.toString()}`,
			token,
		)

		if (!response || response.length === 0) {
			break
		}

		repositories.push(...response.filter(repository => !repository.fork))

		if (response.length < GITHUB_REPOSITORY_PAGE_SIZE) {
			break
		}
	}

	return repositories
}

async function getPublicLanguageDistributionFromGraphQL(
	username: string,
	token: string,
): Promise<GitHubLanguageDistribution | null> {
	const usageAccumulator = createLanguageUsageAccumulator()
	let cursor: string | null = null

	for (let page = 1; page <= GITHUB_MAX_REPOSITORY_PAGES; page += 1) {
		const graphQLResponse: GitHubPublicRepositoriesLanguagesGraphQLResponse | null =
			await fetchGitHubGraphQL<GitHubPublicRepositoriesLanguagesGraphQLResponse>(
				PUBLIC_REPOSITORIES_LANGUAGES_QUERY,
				{
					username,
					first: GITHUB_REPOSITORY_PAGE_SIZE,
					after: cursor,
					languagesLimit: GITHUB_PINNED_LANGUAGE_LIMIT,
				},
				token,
			)

		const repositoriesConnection:
			| {
					nodes?: Array<GitHubPublicRepositoryNode | null> | null
					pageInfo?: {
						hasNextPage?: boolean | null
						endCursor?: string | null
					} | null
			  }
			| null
			| undefined = graphQLResponse?.user?.repositories
		const nodes = repositoriesConnection?.nodes ?? []

		if (nodes.length === 0) {
			break
		}

		for (const repository of nodes) {
			if (!repository) {
				continue
			}

			const repositoryLanguageBytes = new Map<string, number>()
			mergeLanguageEdges(repositoryLanguageBytes, repository.languages?.edges)
			registerRepositoryLanguageSample(usageAccumulator, repositoryLanguageBytes)
		}

		const hasNextPage = repositoriesConnection?.pageInfo?.hasNextPage ?? false
		const endCursor: string | null = repositoriesConnection?.pageInfo?.endCursor ?? null

		if (!hasNextPage || !endCursor) {
			break
		}

		cursor = endCursor
	}

	if (usageAccumulator.repositoryCount === 0) {
		return null
	}

	return toLanguageDistribution(usageAccumulator)
}

async function getPublicLanguageDistributionFromRest(
	username: string,
	token?: string,
): Promise<GitHubLanguageDistribution> {
	const repositories = await getPublicRepositories(username, token)

	if (repositories.length === 0) {
		return createEmptyLanguageDistribution()
	}

	const usageAccumulator = createLanguageUsageAccumulator()

	for (let index = 0; index < repositories.length; index += GITHUB_REST_LANGUAGE_BATCH_SIZE) {
		const batch = repositories.slice(index, index + GITHUB_REST_LANGUAGE_BATCH_SIZE)
		const languageResponses = await Promise.all(
			batch.map(repository =>
				fetchGitHubJson<GitHubLanguageBytesResponse>(`/repos/${repository.full_name}/languages`, token),
			),
		)

		for (const response of languageResponses) {
			if (!response) {
				continue
			}

			const repositoryLanguageBytes = new Map<string, number>()
			mergeLanguageBytes(repositoryLanguageBytes, response)
			registerRepositoryLanguageSample(usageAccumulator, repositoryLanguageBytes)
		}
	}

	return toLanguageDistribution(usageAccumulator)
}

async function getGitHubLanguageDistribution(username: string, token?: string): Promise<GitHubLanguageDistribution> {
	if (token) {
		const graphQLDistribution = await getPublicLanguageDistributionFromGraphQL(username, token)

		if (graphQLDistribution) {
			return graphQLDistribution
		}
	}

	return getPublicLanguageDistributionFromRest(username, token)
}

async function getPinnedRepositories(username: string, token?: string): Promise<GitHubPinnedRepository[]> {
	const response = await fetchGitHubGraphQL<GitHubPinnedItemsGraphQLResponse>(
		PINNED_REPOSITORIES_QUERY,
		{
			username,
			limit: GITHUB_PINNED_LIMIT,
			languagesLimit: GITHUB_PINNED_LANGUAGE_LIMIT,
		},
		token,
	)

	const pinnedNodes = response?.user?.pinnedItems?.nodes ?? []

	return pinnedNodes
		.filter((node): node is GitHubPinnedRepositoryNode => node !== null)
		.map(repository => ({
			id: repository.id,
			name: repository.name,
			fullName: repository.nameWithOwner,
			description: repository.description,
			url: repository.url,
			stars: repository.stargazerCount,
			forks: repository.forkCount,
			pushedAt: repository.pushedAt ?? new Date(0).toISOString(),
			languages: toPinnedLanguageStats(repository.languages?.edges),
		}))
}

export async function getGitHubActivity(): Promise<GitHubActivity> {
	const token = process.env.GITHUB_TOKEN?.trim()

	try {
		const [recentRepositories, pinnedRepositories, languageDistribution] = await Promise.all([
			getRecentPushRepositories(GITHUB_USERNAME, token),
			getPinnedRepositories(GITHUB_USERNAME, token),
			getGitHubLanguageDistribution(GITHUB_USERNAME, token),
		])
		const repositories = (await Promise.all(recentRepositories.map(repo => getRepositoryActivity(repo, token)))).filter(
			(repo): repo is GitHubRepository => repo !== null,
		)

		return {
			username: GITHUB_USERNAME,
			repositories,
			pinnedRepositories,
			languageDistribution,
		}
	} catch {
		return {
			username: GITHUB_USERNAME,
			repositories: [],
			pinnedRepositories: [],
			languageDistribution: createEmptyLanguageDistribution(),
		}
	}
}
