import {create} from 'zustand';

const useAuthStore = create((set) => ({
    currentState: 'Authorized',
    setcurrentState: (state) => set({ currentState: state }),
}));

export default useAuthStore;