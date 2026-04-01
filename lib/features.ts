export function isProjectsFeatureEnabled(): boolean {
	const value = process.env.NEXT_PUBLIC_FEATURE_PROJECTS_ENABLED

	return value?.trim().toLowerCase() !== 'false'
}
