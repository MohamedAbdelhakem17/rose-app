import React from 'react';

type LayoutProps = {
  related: React.ReactNode;
  review: React.ReactNode;
  children: React.ReactNode;
};
export default function layout({ related, review, children }: LayoutProps) {
  return (
    <>
      {children}
      {review}
      {related}
    </>
  );
}
