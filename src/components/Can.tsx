/* eslint-disable react/require-default-props */
import { useCan } from 'hooks/useCan';

type CanProps = {
  children: React.ReactNode;
  permissions?: string[];
  roles?: string[];
};

export const Can = ({ children, permissions, roles }: CanProps) => {
  const userCanSeeComponent = useCan({ permissions, roles });

  if (!userCanSeeComponent) {
    return null;
  }

  return <>{children}</>;
};
