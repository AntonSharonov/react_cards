import { FC, useEffect, useState } from "react";
import { useStore } from "effector-react";
import { $data, $isLoading, onFetchLoadingStarted } from "./cardList.model";
import { Card } from "../ui/card/card";

export const CardList: FC = () => {
    const isLoading = useStore($isLoading);
    const data = useStore($data);

    const [isFiltered, filterToggle] = useState(false);
    const handleFilter = () => filterToggle(filter => !filter);

    useEffect(() => {
        onFetchLoadingStarted();
    }, [])

    return (
        <div style={{
            display: "flex",
            flexDirection: 'column',
            width: '100%',
            justifyContent: 'center',
            alignItems: 'center'
        }}>
            <button onClick={handleFilter} style={{ margin: '40px', width:'300px', height:'50px' }}>{!isFiltered ? 'ПОКАЗАТЬ КАРТОЧКИ С ЛАЙКАМИ' : 'ПОКАЗАТЬ ВСЕ'}</button>
            {data?.map((card) => (
                <Card key={card.id}
                      isLoading={isLoading}
                      name={card.name}
                      date={card.first_brewed}
                      imageUrl={card.image_url}
                      tagline={card.tagline}
                      isFiltered={isFiltered}
                />
            ))
            }
        </div>
    )
}