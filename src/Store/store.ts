import { create } from 'zustand';

type Store = {
    showQuestion: boolean;
    setShowQuestion: (show: boolean) => void;
    showBTN: boolean;
    setShowBTN: (showbtn: boolean) => void;
    ////////////////////////////////////////////////
   selectedModel:string;
   ChangeSeletedModel: (modal: string) => void,

};

const useStore = create<Store>((set) => ({
    showQuestion: false,
    showBTN:true,
    setShowBTN:(showbtn:boolean)=>set((state)=>({showBTN:showbtn})),
    setShowQuestion: (show:boolean) => set((state) => ({showQuestion:show})),


    selectedModel:'model1',
    ChangeSeletedModel:(model: string)=>set((state)=>({selectedModel:model})),
  
}));

export default useStore;
