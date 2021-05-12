import {useCallback, useEffect, useRef, useState,} from 'react';
import {useField} from '@unform/core';

import {Container} from './styles';

interface InputProps {
    name: string,
    icon: string,
}

export function Input({name, icon: Icon, ...rest}: InputProps) {
    const inputRef = useRef(null);

    const [isFocused, setIsFocused] = useState(false);
    const [isFilled, setIsFilled] = useState(false);

    const {fieldName, defaultValue, registerField} = useField(name);

    const handleInputFocus = useCallback(() => {
        setIsFocused(true);
    }, []);

    // const handleInputBlur = useCallback(() => {
    //     setIsFocused(false);
    //
    // setIsFilled(!!inputRef.current?.value);
    // }, []);

    function handleInputBlur(value: string) {
        setIsFocused(false);
        setIsFilled(!!value);
        console.log(isFilled);
    }

    useEffect(() => {
        registerField({
            name: fieldName,
            ref: inputRef.current,
            path: 'value',
        });
    }, [fieldName, registerField]);

    return (
        <Container isFilled={isFilled} isFocused={isFocused}>
            {Icon && <Icon/>}
            {/*{Icon && <Icon size={20}/>}*/}

            <input
                onFocus={handleInputFocus}
                onBlur={event => handleInputBlur(event.target.value)}
                defaultValue={defaultValue}
                ref={inputRef}
                {...rest}
            />
        </Container>
    );
}

export default Input;
