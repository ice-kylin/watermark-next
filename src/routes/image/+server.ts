import { json } from '@sveltejs/kit';
import { readFile } from 'fs/promises';
import path from 'path';

export async function POST({ request }): Promise<Response> {
	const { imagePath } = await request.json();

	try {
		const imageBuffer = await readFile(path.normalize(imagePath));
		return new Response(imageBuffer, {
			headers: { 'Content-Type': 'image/jpeg' }
		});
	} catch (error) {
		return json({ error: 'Image not found' }, { status: 404 });
	}
}
