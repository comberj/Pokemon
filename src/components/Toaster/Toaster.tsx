import React, { useEffect, useState } from 'react';
import { eventNames } from '../../constants';

import './Toaster.scss';

const Toaster: React.FC = () => {

  const [toastVisible, setToastVisible] = useState<boolean>(false)
  const [toastMessage, setToastMessage] = useState<string>('')

  useEffect(() => {
    const cardLimitReached = PubSub.subscribe(eventNames.CARD_LIMIT_REACHED, (_msg: string, value: string) =>
      displayToastNotification(value)
    );
    const cardAlreadyIncluded = PubSub.subscribe(eventNames.CARD_ALREADY_INCLUDED, (_msg: string, value: string) =>
      displayToastNotification(value)
    );

    return () => {
      PubSub.unsubscribe(cardLimitReached);
      PubSub.unsubscribe(cardAlreadyIncluded);
    };
  }, []);

  const displayToastNotification = (value:string) => {
    setToastVisible(true);
    setToastMessage(value)
    setTimeout(() => {
      setToastVisible(false)
      setToastMessage('')
    }, 5000)
  }

  return (
    <>
    {toastVisible && (
      <div className="toaster__container" aria-label='toastMessage'>{toastMessage}</div>
    )}
    </>
  );
};

export default Toaster;
