import { createEffect, createEvent, createStore, forward } from "effector";
import { SEARCH_SPACE } from "../../assets/const";

type Card = { id: number, image_url: string, name: string, first_brewed: string, tagline: string };

export const $data = createStore<Card[]>([]);

export const $isLoading = createStore<boolean>(false);
export const $isLoadingFinished = createStore<boolean>(false);
export const $isFiltered = createStore<boolean>(false);
export const $inputSearch = createStore<string[]>(['']);
export const $checkedIDs = createStore<number[]>([]);
export const $likedIDs = createStore<number[]>([]);
export const $isDisplayDeleteModal = createStore<boolean>(false);
export const $isDisplayCreateNewCardModal = createStore<boolean>(false);
export const $isMenuOpen = createStore<boolean>(true);

export const onFetchedFx = createEffect(async () => {
    const res = await fetch(`${ process.env.REACT_APP_PUNK_API_URL }`);
    return await res.json();
})

export const onFetchLoadingStarted = createEvent();
export const onFetchLoadingFinished = createEvent();
export const onFilterChanged = createEvent();
export const onFilterReset = createEvent();
export const onInputSearched = createEvent<string>();
export const onSearchReset = createEvent();
export const updateCheckedRoles = createEvent<number>();
export const removeCheckedRoles = createEvent<number>();
export const resetCheckedRoles = createEvent();
export const onDisplayDeleteModal = createEvent();
export const onDeleteModalReset = createEvent();
export const onDisplayCreateCardModal = createEvent();
export const onCreateCardModalReset = createEvent();
export const onRemoveCard = createEvent<number>();
export const updateLikedRoles = createEvent<number>();
export const addLikedRoles = createEvent<number>();
export const removeLikedRoles = createEvent<number>();
export const resetLikedRoles = createEvent();
export const onCreateNewCard = createEvent<Card>();
export const onMenuClose = createEvent();
export const onMenuReset = createEvent();

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
}).on(onRemoveCard, (store, value) => store.filter((card) => card.id !== value));

$data.on(onCreateNewCard, (s, v) => s.concat(v));
$isLoading.on(onFetchLoadingStarted, () => true).reset(onFetchLoadingFinished);
$isLoadingFinished.on(onFetchLoadingFinished, () => true);
$isFiltered.on(onFilterChanged, (value) => !value).reset(onFilterReset);
$inputSearch.on(onInputSearched, (store, value) => value.split(SEARCH_SPACE)).reset(onSearchReset);
$isDisplayDeleteModal.on(onDisplayDeleteModal, (display) => !display).reset(onDeleteModalReset);
$isDisplayCreateNewCardModal.on(onDisplayCreateCardModal, (display) => !display).reset(onCreateCardModalReset);
$isMenuOpen.on(onMenuClose, (v) => !v).reset(onMenuReset);

$checkedIDs
    .on(updateCheckedRoles, (s, r) => {
        return s.find((id) => id === r) ? s.filter((id) => id !== r) : s.concat(r);
    })
    .on(removeCheckedRoles, (store, value) => store.filter((id) => id !== value))
    .reset(resetCheckedRoles);

$likedIDs
    .on(updateLikedRoles, (s, r) => {
        return s.find((id) => id === r) ? s.filter((id) => id !== r) : s.concat(r);
    })
    .on(addLikedRoles, (store, value) => store.concat(value))
    .on(removeLikedRoles, (store, value) => store.filter((id) => id !== value))
    .reset(resetLikedRoles);

$checkedIDs.watch((el) => console.log('checked:', el));
$likedIDs.watch((el) => console.log('liked:', el));
$data.watch((el) => console.log('data:', el));

forward({
    from: onFetchLoadingStarted,
    to: onFetchedFx,
})

forward({
    from: onFetchedFx.doneData,
    to: onFetchLoadingFinished,
})

forward({
    from: onRemoveCard,
    to: removeCheckedRoles,
})

forward({
    from: onRemoveCard,
    to: removeLikedRoles,
})