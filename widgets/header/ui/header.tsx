'use client';
import React, { useEffect, useState } from 'react';
import { cn } from '@shared/lib/utils';
import Image from 'next/image';
import { AuthModal } from '@shared/components/shared/modals/auth-modal/auth-modal';
import { Container } from '@shared/ui';
import { CartButton } from '@widgets/cart-drawer/ui/cart-button';
import { ProfileButton } from './profile-button';
import { SearchInput } from './search-input';
import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';
import toast from 'react-hot-toast';

interface Props {
  className?: string;
  hasSearch?: boolean;
  hasCart?: boolean;
}

export const Header: React.FC<Props> = ({
  className,
  hasSearch = true,
  hasCart = true,
}) => {
  const searchParams = useSearchParams();
  const [openAuthModal, setOpenAuthModal] = useState(false);
  const router = useRouter();
  useEffect(() => {
    let toastMessage = '';
    if (searchParams.has('paid')) {
      toastMessage = 'Заказ оплачен';
    }
    if (searchParams.has('verified')) {
      toastMessage = 'Почта успешно подтверджена!';
    }
    if (toastMessage) {
      setTimeout(() => {
        router.replace('/');
        toast.success(toastMessage, {
          duration: 3000,
        });
      }, 1000);
    }
  }, []);

  return (
    <header className={cn('flex flex-col border-b', className)}>
      <Container
        className={'flex w-full gap-5 items-center justify-between py-8'}
      >
        <Link href="/">
          <div className={'flex items-center gap-4'}>
            <Image
              src={'/logo.png'}
              alt={'logo'}
              className={'min-w-8'}
              width={35}
              height={35}
            />

            <div>
              <h1 className={'text-2xl uppercase font-black max-xs:text-xl'}>
                Next Pizza
              </h1>
              <p className={'text-sm text-gray-400 leading-3 max-xs:hidden'}>
                вкусней уже некуда
              </p>
            </div>
          </div>
        </Link>
        {hasSearch && (
          <div className="mx-10 flex-1 md:block hidden">
            <SearchInput />
          </div>
        )}
        <div className="flex items-center gap-3">
          <AuthModal
            open={openAuthModal}
            onClose={() => setOpenAuthModal(false)}
          />
          <ProfileButton onClickSignIn={() => setOpenAuthModal(true)} />

          {hasCart && <CartButton />}
        </div>
      </Container>
      <div className="mx-6 flex-1 mb-3">
        <SearchInput className={' mobile-vision'} />
      </div>
    </header>
  );
};
