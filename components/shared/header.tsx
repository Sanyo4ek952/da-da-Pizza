import React from 'react';
import {cn} from "@/lib/utils";
import {Container} from "@/components/shared/container";
import Image from 'next/image';

interface Props {
    className?: string;
}

const Header = ({className}: Props) => {
    return (
        <header className={cn('border border-b', className)}>
            <Container className={'flex items-center justify-between py-8'}>
                <div className={'flex items-center gap-4'}>
                    <div><Image src={'/logo.png'} alt={'logo'} width={35} height={35}/></div>
                    <div>
                        <div className={'text-2xl uppercase font-black'}>Next Pizza</div>
                        <p className={'text-sm text-gray-400 leading-3'}>вкусней уже некуда</p>
                    </div>
                </div>
            </Container>
        </header>
    );
};

export default Header;