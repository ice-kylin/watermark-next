import type { PageLoad } from './$types';
import type { Logo } from '$lib/type';

type Data = {
	logo: Logo;
	camera: string;
	lens: string;
	info: string;
	time: string;
	colors: {
		camera: string;
		lens: string;
		info: string;
		time: string;
		background: string;
		divider: string;
	};
	fonts: {
		camera: string;
		lens: string;
		info: string;
		time: string;
	};
	padding: {};
};

export const load: PageLoad = async ({ params }) => {
	return JSON.parse(decodeURIComponent(params.data)) as Data;
};
