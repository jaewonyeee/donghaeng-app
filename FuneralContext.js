import React, { createContext, useState } from 'react';

const FuneralContext = createContext();

const FuneralProvider = ({ children }) => {
  const [funeralStatus, setFuneralStatus] = useState('');
  const [funeralHome, setFuneralHome] = useState(null); // 장례식장 정보 상태 추가
  const [funeralMethod, setFuneralMethod] = useState('');
  const [funeralAttire, setFuneralAttire] = useState(null);
  const [funeralFlower, setFuneralFlower] = useState(null);
  const [funeralMenu, setFuneralMenu] = useState({
    soup: null,
    sides: [],
    riceCake: null
  });
  const [funeralItems, setFuneralItems] = useState({
    tablet: { selected: false, price: 1000 },
    incense: { selected: false, price: 2000 },
    condolenceBook: { selected: false, price: 3000 },
    candle: { selected: false, price: 4000 },
    incenseStick: { selected: false, price: 5000 },
    portraitRibbon: { selected: false, price: 6000 },
  });
  const [funeralDetails, setFuneralDetails] = useState({
    crematorium: '',
    date: '',
    time: ''
  });
  const [cemeteryLoc, setCemeteryLoc] = useState(null);
  const [funeralCoffin, setFuneralCoffin] = useState(null);
  const [funeralShroud,setFuneralShroud] = useState(null);
  const [ceremonyItems, setCeremonyItems] = useState({
    mortuaryTablet: { selected: false, price: 1000 },
    coffinCloth: { selected: false, price: 2000 },
    outerCoffinCloth: { selected: false, price: 3000 },
    ceremonialSilk: { selected: false, price: 4000 },
    spiritTablet: { selected: false, price: 5000 },
    alcohol: { selected: false, price: 6000 },
    cotton: { selected: false, price: 7000 },
    hanji: { selected: false, price: 8000 },
    sushipo: { selected: false, price: 9000 },
    sushimat: { selected: false, price: 10000 },
    sushipillow: { selected: false, price: 11000 },
    headScarf: { selected: false, price: 12000 },
    haengjeon: { selected: false, price: 13000 },
    carRibbon: { selected: false, price: 14000 },
    cottonGloves: { selected: false, price: 15000 },
  });


  return (
    <FuneralContext.Provider value={{
      funeralStatus, setFuneralStatus,
      funeralHome, setFuneralHome, // 장례식장 정보 설정 함수 추가
      funeralMethod, setFuneralMethod,
      funeralAttire, setFuneralAttire,
      funeralFlower, setFuneralFlower,
      funeralMenu, setFuneralMenu,
      funeralItems, setFuneralItems,
      funeralDetails, setFuneralDetails,
      cemeteryLoc,setCemeteryLoc,
      funeralCoffin,setFuneralCoffin,
      funeralShroud,setFuneralShroud,
      ceremonyItems, setCeremonyItems,
    }}>
      {children}
    </FuneralContext.Provider>
  );
};

export { FuneralContext, FuneralProvider };
