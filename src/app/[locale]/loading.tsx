import Loader from '@/components/Loader'

/**
 * Shown while a segment under [locale] is still rendering.
 *
 * Most of this site is prerendered, so on a warm cache this almost never
 * appears — it is there for a cold first load or a slow connection, which is
 * exactly when a blank screen costs the most. Delete this file to switch it off;
 * the component itself is used nowhere else.
 */
const Loading = () => <Loader text="Loading" />

export default Loading
