import { createEffect, createEvent, createStore, forward } from "effector";
import { SEARCH_SPACE } from "../../assets/const";

type Card = { id: string, image_url: string, name: string, first_brewed: string, tagline: string };
type Data = [Card];

export const $data = createStore<Data>([{ id: '', image_url: '', name: '', first_brewed: '', tagline: '' }]);

export const $isLoading = createStore<boolean>(false);
export const $isFiltered = createStore<boolean>(false);
export const $inputSearch = createStore<string[]>(['']);

export const onFetchedFx = createEffect(async () => {
    const res = await fetch(`${process.env.REACT_APP_PUNK_API_URL}`);
    return await res.json();
})

export const onFetchLoadingStarted = createEvent();
export const onFetchLoadingFinished = createEvent();
export const onFilterChanged = createEvent();
export const onFilterReset = createEvent();
export const onInputSearched = createEvent<string>();
export const onSearchReset = createEvent();

$data.on(onFetchedFx.doneData, (_, data) => {
    return data.map((card: Card) => {
        return {
            id: card.id,
            image_url: card.image_url,
            name: card.name,
            first_brewed: card.first_brewed,
            tagline: card.tagline,
        }
    })
});

$isLoading.on(onFetchLoadingStarted, () => true).reset(onFetchLoadingFinished);
$isFiltered.on(onFilterChanged, (value) => !value).reset(onFilterReset);
$inputSearch.on(onInputSearched, (store, value) => value.split(SEARCH_SPACE)).reset(onSearchReset);

forward({
    from: onFetchLoadingStarted,
    to: onFetchedFx,
})

forward({
    from: onFetchedFx.doneData,
    to: onFetchLoadingFinished,
})