import { FC, useState } from "react";

interface ICard {
    isLoading: boolean;
    name: string | null;
    date: string | null;
    imageUrl: string | null;
    tagline: string | null;
    isFiltered: boolean;
}

export const Card: FC<ICard> = (
    {
        isLoading,
        name,
        date,
        imageUrl,
        tagline,
        isFiltered,
    }
) => {

    const imgSrcDefault = 'https://cdn.caracter.ru/images/thumbnails/950/950/detailed/4/karnavalnyy-kostyum-butylka-piva-10572.jpg';

    const [isLiked, likeToggle] = useState(false);
    const handleLike = () => likeToggle(like => !like);

    const [isRemoved, remove] = useState(false);
    const handleRemove = () => remove(display => !display);


    // if isLoading

    return (
        <div style={{
            display: isRemoved || (isFiltered && !isLiked) ? 'none' : "flex",
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
            border: '1px solid #dbdbdb',
            borderRadius: '10px',
            width: '70%',
            height: '150px',
            margin: '10px',
            backgroundColor: '#e3faff',
        }}>
            {isLoading ? <div style={{
                    display: "flex",
                    flexDirection: "row",
                    justifyContent: "space-between",
                    alignItems: "center",
                    width: '100%',
                }}>Loading...</div> :
                <div style={{
                    display: "flex",
                    flexDirection: "row",
                    justifyContent: "space-between",
                    alignItems: "center",
                    width: '100%',
                }}>
                    <img height='140px' style={{ margin: '0 50px' }} src={imageUrl || imgSrcDefault}
                         alt="Beer"/>
                    <h2>{name}</h2>
                    <p>{date}</p>
                    <p>{tagline}</p>
                    <button className={isLiked ? 'heart heartRed' : 'heart heartWhite'}
                            onClick={() => handleLike()}></button>
                    <button style={{ margin: '30px' }} onClick={() => handleRemove()}>REMOVE</button>
                </div>}
        </div>
    )
}