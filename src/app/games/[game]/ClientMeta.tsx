'use client';
import { Fragment } from 'react';

export default function ClientMeta({ title, description }: { title: string; description: string }) {
  return (
    <Fragment>
      <title>{title}</title>
      <meta name='description' content={description} />
    </Fragment>
  );
}
