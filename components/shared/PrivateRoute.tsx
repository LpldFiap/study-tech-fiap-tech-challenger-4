import React from 'react';
import { useNavigation } from '@react-navigation/native';
import { checkAuth } from '@/utils/auth';

interface PrivateRouteProps {
  children: JSX.Element;
  allowedRoles: string[];
}

export function PrivateRoute({ children, allowedRoles }: PrivateRouteProps) {
  const navigation = useNavigation();
  const role = checkAuth();

  if (!role) {
    navigation.navigate('Login' as never);
  }

  if (!allowedRoles.includes(role)) {
    navigation.navigate('Home' as never);
    return null;
  }

  return children;
}
