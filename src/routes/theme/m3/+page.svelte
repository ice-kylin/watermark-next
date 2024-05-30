<script lang="ts">
	import { onMount } from 'svelte';
	import Canon from '$lib/logo/canon.svelte';

	let imagePath = '/Users/icekylin/Desktop/IMG_0281.jpg';
	let imageUrl = '';

	async function fetchImage() {
		const response = await fetch('/image', {
			method: 'POST',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify({ imagePath })
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

<div class="p-16 inline-block w-fit" style="background-color: #cdeda4">
	{#if imageUrl}
		<img src={imageUrl} alt="Origin" class="max-w-fit" />
	{:else}
		<p>Loading...</p>
	{/if}
	<div class="pt-16 px-16 flex justify-between" style="font-size: 64px; font-family: 'Source Sans 3'">
		<div>
			<p class="font-bold" style="color: #102000">RF-S55-210mm F5-7.1 IS STM</p>
			<p style="color: #44483d">Canon EOS R50</p>
		</div>
		<div style="font-size: 64px; color: #102000" class="flex gap-16 items-center">
			<Canon />
			<div class="border-l-4 pl-16" style="border-color: #44483d">
				<p class="font-bold" style="color: #102000">162mm f/11.0 15s ISO100</p>
				<p style="color: #44483d">2024-05-22 13:13</p>
			</div>
		</div>
	</div>
</div>
