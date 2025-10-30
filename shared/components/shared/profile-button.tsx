'use client';
import React, { FC } from 'react';
import { Button } from '@/shared/components';
import { CircleUser, User } from 'lucide-react';
import { cn } from '@/shared/lib/utils';
import Link from 'next/link';
import { useSession } from 'next-auth/react';

interface Props {
  onClickSignIn?: () => void;
  className?: string;
}
export const ProfileButton: FC<Props> = ({ className }) => {
  const { data: session } = useSession();
  return (
    <div className={className}>
      {!session ? (
        <Button variant="outline" className={cn('flex items-center gap-1')}>
          <User size={16} />
          Войти
        </Button>
      ) : (
        <Link href={'/profile'}>
          <Button variant={'secondary'} className={'flex items-center gap-2'}>
            <CircleUser size={18} />
            Профиль
          </Button>
        </Link>
      )}
    </div>
  );
};
