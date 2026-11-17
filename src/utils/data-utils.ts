import { type CollectionEntry } from 'astro:content';
import { slugify } from './common-utils';

// Total ordering makes RSS, pagination and prev/next links reproducible across
// Astro loaders, GitHub Actions and Vercel for equal publication dates.
export function sortItemsByDateDesc(
    itemA: CollectionEntry<'blog' | 'projects' | 'cases'>,
    itemB: CollectionEntry<'blog' | 'projects' | 'cases'>
) {
    const aTime = itemA.data.publishDate?.getTime() ?? NaN;
    const bTime = itemB.data.publishDate?.getTime() ?? NaN;
    const aValid = Number.isFinite(aTime);
    const bValid = Number.isFinite(bTime);
    if (aValid && bValid && aTime !== bTime) return bTime - aTime;
    if (aValid !== bValid) return bValid ? 1 : -1;
    // Codepoint ordering avoids locale-dependent sort differences.
    return itemA.id < itemB.id ? -1 : itemA.id > itemB.id ? 1 : 0;
}

export function getAllTags(posts: CollectionEntry<'blog'>[]) {
    const tags: string[] = [...new Set(posts.flatMap((post) => post.data.tags || []).filter(Boolean))];
    return tags
        .map((tag) => {
            return {
                name: tag,
                id: slugify(tag)
            };
        })
        .filter((obj, pos, arr) => {
            return arr.map((mapObj) => mapObj.id).indexOf(obj.id) === pos;
        });
}

export function getPostsByTag(posts: CollectionEntry<'blog'>[], tagId: string) {
    const filteredPosts: CollectionEntry<'blog'>[] = posts.filter((post) => (post.data.tags || []).map((tag) => slugify(tag)).includes(tagId));
    return filteredPosts;
}
