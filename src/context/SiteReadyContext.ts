import { createContext, useContext } from 'react';
export const SiteReadyCtx = createContext(false);
export const useSiteReady = () => useContext(SiteReadyCtx);
