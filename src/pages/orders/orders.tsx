import React, { FC, useEffect } from "react";
import styles from "./order-styles.module.css";
import { useAppDispatch, useAppSelector } from "../../services/hooks/redux";
import { WSS_API_Profile } from "../../utils/data";
import { wsConnectProfile, wsDisconnectProfile } from "../../services/ws-feed-profile/actions";
import { getResponsesProfile } from "../../services/ws-feed-profile/slice";
import { wsConnect, wsDisconnect } from "../../services/ws-feed/actions";

interface IOrder {
 
}

const FeedOrders: FC<IOrder> = () => {

  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(wsConnect(WSS_API_Profile));
    
    return () => {
      dispatch(wsDisconnect());
    };
  }, [dispatch])

  const responseWss = useAppSelector(getResponsesProfile);
  console.log(responseWss)
  
  return (
    <div className={`${styles.title} text text_type_main-large`}>
      
    </div>
  );
};

export { FeedOrders };
