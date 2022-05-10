import { createEffect, createEvent, createStore, forward } from "effector";

type Data = [{ id: string, image_url: string, name: string, first_brewed: string, tagline: string }];

export const $data = createStore<Data>([{ id: '', image_url: '', name: '', first_brewed: '', tagline: '' }]);

export const $isLiked = createStore<boolean>(false);
export const $isHidden = createStore<boolean>(false);
export const $isLoading = createStore<boolean>(false);
export const $isChecked = createStore<boolean>(false);

export const onFetchedFx = createEffect(async () => {
    const res = await fetch(`${process.env.REACT_APP_PUNK_API_URL}`);
    return await res.json();
})

export const onFetchLoadingStarted = createEvent();
export const onFetchLoadingFinished = createEvent();

export const onLikeToggled = createEvent();
export const onLikeReset = createEvent();
export const onHideToggled = createEvent();
export const onHideReset = createEvent();
export const onCheckToggled = createEvent();
export const onCheckReset = createEvent();

$data.on(onFetchedFx.doneData, (_, data) => {
    return data.map((card: { id: string; image_url: string; name: string; first_brewed: string; tagline: string; }) => {
        return {
            id: card.id,
            image_url: card.image_url,
            name: card.name,
            first_brewed: card.first_brewed,
            tagline: card.tagline,
        }
    })
});

$isLiked.on(onLikeToggled, (store) => !store).reset(onLikeReset);
$isHidden.on(onHideToggled, (store) => !store).reset(onHideReset);
$isLoading.on(onFetchLoadingStarted, () => true).reset(onFetchLoadingFinished);
$isChecked.on(onCheckToggled, (store) => !store).reset(onCheckReset);

$data.watch((data) => console.log('data:', data));

forward({
    from: onFetchLoadingStarted,
    to: onFetchedFx,
})

forward({
    from: onFetchedFx.doneData,
    to: onFetchLoadingFinished,
})