<script lang="ts">
	import type { PageData } from './$types';
	import { onMount } from 'svelte';
	import Canon from '$lib/logo/canon.svelte';

	export let data: PageData;

	let imageUrl = '';

	async function fetchImage() {
		const response = await fetch('/image', {
			method: 'POST',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify({ imagePath: data.image })
		});

		if (response.ok) {
			const blob = await response.blob();
			imageUrl = URL.createObjectURL(blob);
		} else {
			console.error('Failed to fetch image:', await response.json());
		}
	}

	onMount(() => {
		fetchImage();
	});
</script>

<div class="watermark-container inline-block w-fit p-16" style="background-color: #cdeda4">
	{#if imageUrl}
		<img src={imageUrl} alt="Origin" class="max-w-fit" />
	{:else}
		<p>Loading...</p>
	{/if}
	<div
		class="flex justify-between px-16 pt-16"
		style="font-size: 64px; font-family: 'Source Sans 3'"
	>
		<div>
			<p class="font-bold" style="color: #102000">{data.exif.lens}</p>
			<p style="color: #44483d">{data.exif.camera}</p>
		</div>
		<div style="font-size: 64px; color: #102000" class="flex items-center gap-16">
			<Canon />
			<div class="border-l-4 pl-16" style="border-color: #44483d">
				<p class="font-bold" style="color: #102000">{data.exif.info}</p>
				<p style="color: #44483d">{data.exif.time}</p>
			</div>
		</div>
	</div>
</div>
