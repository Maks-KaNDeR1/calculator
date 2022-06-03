import React, { ChangeEvent, KeyboardEvent, MouseEvent, useCallback, useEffect, useRef, useState } from 'react'
import { ButtonBlock } from './Button/Button'
import style from './Calculator.module.css'


export const Calculator = () => {

    const digit = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '0', '00', ',']
    const action = ['/', '*', '-', '+']

    let [a, setA] = useState<string>('')
    let [b, setB] = useState<string>('')
    let [sign, setSign] = useState<string>('')

    const [finish, setFinish] = useState(false)
    const [actionSum, setActionSum] = useState(false)

    const equality = () => {
        // if (b === '') setB(a)
        if (sign === '+') setA((Number(a) + Number(b)).toString())
        if (sign === '-') setA((Number(a) - Number(b)).toString())
        if (sign === '*') setA((Number(a) * Number(b)).toString())
        if (sign === '/') setA((Number(a) / Number(b)).toString())
    }

    const workWithEvents = useCallback((e: string) => {
        if (digit.includes(e)) {
            if (b === '' && sign === '') {
                setA(a += e)
                setActionSum(false)
            } if (a !== '' && b !== '' && finish) {
                setB(b += e)
                setFinish(false)
                setActionSum(true)
                if (a !== '' && b === '') {
                    setActionSum(true)
                }
            } else if (sign !== '') {
                setB(b += e)
                setActionSum(true)
                if (a !== '' && b === '') {
                    setActionSum(true)
                }
            }
        }
        if (action.includes(e)) {
            setSign(sign = e)
            // setActionSum(true)
        }
        if (e === '=') {
            equality()
        }
        if (e === '%') {
            setActionSum(true)
            let num = Number(a)
            let perc = num * 0.01
            setA((perc).toString())
        }
        if (e === '^') {
            setActionSum(true)
            setA(Math.sqrt(Number(a)).toString())
        }
        if (e === 'C') {
            if (b === '') {
                setA('')
                setB('')
                setSign('')
                setActionSum(false)
            } else {
                setB('')
                setFinish(false)
            }
        }
    }, [a, b])


    const onClickHandler = useCallback((event: MouseEvent<HTMLButtonElement>) => {
        let e = event.currentTarget.value
        workWithEvents(e)
    }, [workWithEvents])

    const onChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
        const value = event.target.value
        console.log(event);

        // let del = event.inputType === 'deleteContentBackward'
        let e = value.length === 1 ? value : value.slice(-1);
        workWithEvents(e)
    }

    const onKeyPressHandler = (e: KeyboardEvent<HTMLInputElement>) => {
        console.log(e.metaKey)
        console.log(e.key === 'Backspace')
        console.log(e.key == 'Delete')
        
        if (e.code === "Equal") {
            setA('')
        } if (e.code === 'NumpadEnter' || e.code === 'Enter') {
            equality()
            setActionSum(true)
        }
    }

    const inputElement = useRef<HTMLInputElement | null>(null);
    useEffect(() => {
        if (inputElement.current) {
            inputElement.current.focus();
        }
    }, [onClickHandler]);


    return (
        <div className={style.mainBlock} >
            <div className={style.display} >
                {
                    actionSum ?
                        <div>
                            <div className={style.classSumValue}>
                                <input value={a} /><span>{sign}</span>
                            </div>
                            <div className={style.classSumTwoValue}>
                                <input ref={inputElement} onKeyPress={onKeyPressHandler} autoFocus
                                    onChange={onChangeHandler} value={!b ? '0' : b} />
                            </div>
                        </div>
                        :
                        <div>
                            <div className={style.classSumValue}>
                                <input value={b} /><span>{sign}</span>
                            </div>
                            <div className={style.classValue}  >
                                <input ref={inputElement} onKeyPress={onKeyPressHandler} autoFocus
                                    onChange={onChangeHandler} value={!a ? '0' : a} />
                            </div>
                        </div>
                }
            </div>
            <ButtonBlock onClickHandler={onClickHandler} />
        </div>
    )
}

