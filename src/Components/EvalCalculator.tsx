/* eslint-disable no-eval */
import React, { ChangeEvent, KeyboardEvent, MouseEvent, useCallback, useEffect, useRef, useState } from 'react'
import { ButtonBlock } from './Button/Button'
import style from './Calculator.module.css'


export const EvalCalculator = () => {

    let [value, setValue] = useState<string>('')
    let [valueTwo, setValueTwo] = useState<string>('')

    const [actionSum, setActionSum] = useState(false)

    const onClickHandler = useCallback((event: MouseEvent<HTMLButtonElement>) => {
        let e = event.currentTarget.value

        if (e === '=') {
            if(value.search(/[^0-9*/+-.]/mi) !== -1) return;
            try {
                setValue(eval(value))
                setActionSum(true)
                setValueTwo(value)
            }
            catch {
                setValue('error')
                setTimeout(() => {
                    setValue('0')
                }, 1500);
            }

        }
        if (e === '1') setValue(value + '1')
        if (e === '2') setValue(value + '2')
        if (e === '3') setValue(value + '3')
        if (e === '4') setValue(value + '4')
        if (e === '5') setValue(value + '5')
        if (e === '6') setValue(value + '6')
        if (e === '7') setValue(value + '7')
        if (e === '8') setValue(value + '8')
        if (e === '9') setValue(value + '9')
        if (e === '0') setValue(value + '0')
        if (e === '00') setValue(value + '00')
        if (e === ',') setValue(value + ',')
        if (e === '+') setValue(value + '+')
        if (e === '-') setValue(value + '-')
        if (e === '*') setValue(value + '*')
        if (e === '/') setValue(value + '/')
        if (e === '%') {
            setActionSum(true)
            setValueTwo(value + '%')
            let num = Number(value)
            let perc = num * 0.01
            setValue((perc).toString())
        }
        if (e === '^') {
            setActionSum(true)
            setValueTwo(value + '^')
            setValue(Math.sqrt(Number(value)).toString())
        }
        if (e === 'C') {
            setValue('')
            setValueTwo('')
            setActionSum(false)
        }
    }, [value])

    const onKeyPressHandler = (e: KeyboardEvent<HTMLInputElement>) => {
        if (e.code === "Equal") {
            setValue('')
        } if (e.code === 'NumpadEnter' || e.code === 'Enter') {
            if (value.search(/[^0-9*/+-.]/mi) !== -1) return
            try {
                setValue(eval(value))
                setActionSum(true)
                setValueTwo(value)
            }
            catch {
                setValue('error')
                setTimeout(() => {
                    setValue('0')
                }, 1500);
            }
        }
    }

    const onChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
        let e = event.currentTarget.value
        if (e.search(/[^0-9*/+-.]/mi)) setValue(e)
        else return

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
                                <input value={valueTwo} />
                            </div>
                            <div className={style.classSumTwoValue}>
                                <input ref={inputElement} autoFocus={true} onKeyPress={onKeyPressHandler} onChange={onChangeHandler} value={!value ? '0' : value} />
                            </div>
                        </div>
                        :
                        <div className={style.classValue}  >
                            <input ref={inputElement} onKeyPress={onKeyPressHandler} autoFocus onChange={onChangeHandler} value={!value ? '0' : value} />
                        </div>
                }
            </div>
            <ButtonBlock onClickHandler={onClickHandler} />
        </div>
    )
}




