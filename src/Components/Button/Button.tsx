import React, { MouseEvent } from 'react'
import style from './Button.module.css'

const items = [
    'C', '^', '%', '/',
    '7', '8', '9', '*',
    '4', '5', '6', '-',
    '1', '2', '3', '+',
    '00', '0', ',', '=',
]

type PropsType = {
    onClickHandler: (e: MouseEvent<HTMLButtonElement>) => void
}

export const ButtonBlock = (props: PropsType) => {
    return <>
        <hr className={style.partition} />
        <div className={style.buttonBlock} >
            {
                items.map(i => <button key={i} value={i} onClick={props.onClickHandler}
                    className={i === '=' ? style.alreadyStyles : style.button}
                > {i} </button>)
            }
        </div>
    </>
}

