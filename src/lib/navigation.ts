import { useNavigate } from 'react-router-dom';

export const navigateTo = (path: string) => {
  const navigate = useNavigate();
  navigate(path);
};

export const navigateToExternal = (url: string) => {
  window.open(url, '_blank', 'noopener,noreferrer');
};
