import { createEffect, createEvent, createStore, forward } from "effector";
import { TCard } from "../../lib/types/cards";

export const $cardsData = createStore<TCard[]>([]);
export const $isLoading = createStore<boolean>(false);
export const $isLoadingFinished = createStore<boolean>(false);
export const $isFiltered = createStore<boolean>(false);
export const $inputSearch = createStore<string[]>(['']);
export const $selectedCardsIDs = createStore<number[]>([]);
export const $likedCardsIDs = createStore<number[]>([]);
export const $isShowCardRemoveModal = createStore<boolean>(false);
export const $isShowCardCreateModal = createStore<boolean>(false);
export const $isShowHeaderMenu = createStore<boolean>(true);

export const onFetchedFx = createEffect(async () => {
    const res = await fetch(`${ process.env.REACT_APP_PUNK_API_URL }`);
    return await res.json();
})

export const onFetchLoadingStarted = createEvent();
export const onFetchLoadingFinished = createEvent();
export const onFilterChanged = createEvent();
export const onInputSearched = createEvent<string>();
export const onSearchReset = createEvent();
export const onSelectedCardsUpdated = createEvent<number>();
export const onSelectedCardsRemoved = createEvent<number>();
export const onSelectedCardsReset = createEvent();
export const onCardRemoveModalShowed = createEvent();
export const onCardCreateModalShowed = createEvent();
export const onCardCreateModalReset = createEvent();
export const onCardRemoved = createEvent<number>();
export const onLikedCardsUpdated = createEvent<number>();
export const onLikedCardsAdded = createEvent<number>();
export const onLikedCardsRemoved = createEvent<number>();
export const onNewCardCreated = createEvent<TCard>();
export const onHeaderMenuShowed = createEvent();

$cardsData.on(onFetchedFx.doneData, (_, cardsData) => {
    return cardsData.map((card: TCard) => {
        return {
            id: card.id,
            image_url: card.image_url,
            name: card.name,
            first_brewed: card.first_brewed,
            tagline: card.tagline,
        }
    })
}).on(onCardRemoved, (cardsData, cardID) => cardsData.filter((card) => card.id !== cardID));

$cardsData.on(onNewCardCreated, (cardsData, newCard) => cardsData.concat(newCard));
$isLoading.on(onFetchLoadingStarted, () => true).reset(onFetchLoadingFinished);
$isLoadingFinished.on(onFetchLoadingFinished, () => true);
$isFiltered.on(onFilterChanged, (f) => !f);
$inputSearch.on(onInputSearched, (_, searchingValue) => searchingValue.split(' ')).reset(onSearchReset);
$isShowCardRemoveModal.on(onCardRemoveModalShowed, (s) => !s);
$isShowCardCreateModal.on(onCardCreateModalShowed, (s) => !s).reset(onCardCreateModalReset);
$isShowHeaderMenu.on(onHeaderMenuShowed, (s) => !s);

$selectedCardsIDs
    .on(onSelectedCardsUpdated, (selectedCardsIDs, newID) => {
        return selectedCardsIDs.find((id) => id === newID) ? selectedCardsIDs.filter((id) => id !== newID) : selectedCardsIDs.concat(newID);
    })
    .on(onSelectedCardsRemoved, (selectedCardsIDs, removedID) => selectedCardsIDs.filter((id) => id !== removedID))
    .reset(onSelectedCardsReset);

$likedCardsIDs
    .on(onLikedCardsUpdated, (likedCardsIDs, newID) => {
        return likedCardsIDs.find((id) => id === newID) ? likedCardsIDs.filter((id) => id !== newID) : likedCardsIDs.concat(newID);
    })
    .on(onLikedCardsAdded, (likedCardsIDs, newID) => likedCardsIDs.concat(newID))
    .on(onLikedCardsRemoved, (likedCardsIDs, removedID) => likedCardsIDs.filter((id) => id !== removedID));

forward({
    from: onFetchLoadingStarted,
    to: onFetchedFx,
})

forward({
    from: onFetchedFx.doneData,
    to: onFetchLoadingFinished,
})

forward({
    from: onCardRemoved,
    to: onSelectedCardsRemoved,
})

forward({
    from: onCardRemoved,
    to: onLikedCardsRemoved,
})