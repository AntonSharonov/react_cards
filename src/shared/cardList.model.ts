import { createEffect, createEvent, createStore, forward } from "effector";

export const $isLiked = createStore<boolean>(false);
export const $isRemoved = createStore<boolean>(false);

export const onLikeChanged = createEvent();
export const onRemoved = createEvent();

$isLiked.on(onLikeChanged, (store) => !store);
$isRemoved.on(onRemoved, (store) => !store);


$isLiked.watch((data) => console.log(data));
$isRemoved.watch((data) => console.log(data));


export const onFetchedFx = createEffect(async () => {
    const url = 'https://api.punkapi.com/v2/beers?page=2&per_page=40';
    const res = await fetch(url);
    return res.json();
})

// export const $imgSrc = createStore<string | null>(null);
// export const $name = createStore<string | null>(null);
// export const $tagline = createStore<string | null>(null);
export const $isLoading = createStore<boolean>(false);
// export const $date = createStore<string | null>(null);

export const $data = createStore<Array<{ id: string, name: string, first_brewed: string, image_url: string | null, tagline: string }> | null>(null);

export const onFetchLoadingStarted = createEvent();
export const onFetchLoadingFinished = createEvent();

// restore
$isLoading.on(onFetchLoadingStarted, () => true).reset(onFetchLoadingFinished);
// $imgSrc.on(onFetchedFx.doneData, (_, res) => res[0].image_url);
// $name.on(onFetchedFx.doneData, (_, res) => res[0].name);
// $tagline.on(onFetchedFx.doneData, (_, res) => res[0].tagline);
// $date.on(onFetchedFx.doneData, (_, res) => res[0].first_brewed);
$data.on(onFetchedFx.doneData, (_, res) => res);

// $imgSrc.watch((data) => console.log(data));

forward({
    from: onFetchLoadingStarted,
    to: onFetchedFx,
})

forward({
    from: onFetchedFx.doneData,
    to: onFetchLoadingFinished,
})


// const $card = combine($isLiked, $isRemoved, $imgSrc, $name, $date, $tagline, (isLiked, isRemoved, imgSrc, name, date, tagline) => ({
//     isLiked,
//     isRemoved,
//     imgSrc,
//     name,
//     date,
//     tagline
// }))
//
// $card.watch(data => console.log(data));

