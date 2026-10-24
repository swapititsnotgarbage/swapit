import { useState, useEffect } from 'react';
import { db } from './firebase';
import { collection, onSnapshot, addDoc, deleteDoc, doc, updateDoc } from 'firebase/firestore';

export function useCloudData(userProfile, stateHandlers) {
  const [firestoreItems, setFirestoreItems] = useState([]);
  const [firestoreTrades, setFirestoreTrades] = useState([]);
  const [firestoreMessages, setFirestoreMessages] = useState([]);
  const [firestoreRatings, setFirestoreRatings] = useState([]);

  useEffect(() => {
    const unsubItems = onSnapshot(collection(db, 'items'), (snapshot) => {
      setFirestoreItems(snapshot.docs.map(d => ({ id: d.id, ...d.data() })));
    });
    const unsubTrades = onSnapshot(collection(db, 'trades'), (snapshot) => {
      setFirestoreTrades(snapshot.docs.map(d => ({ id: d.id, ...d.data() })));
    });
    const unsubMessages = onSnapshot(collection(db, 'messages'), (snapshot) => {
      setFirestoreMessages(snapshot.docs.map(d => ({ id: d.id, ...d.data() })));
    });
    const unsubRatings = onSnapshot(collection(db, 'ratings'), (snapshot) => {
      setFirestoreRatings(snapshot.docs.map(d => ({ id: d.id, ...d.data() })));
    });
    return () => {
      unsubItems(); unsubTrades(); unsubMessages(); unsubRatings();
    };
  }, []);

  const handleCloudAddItem = async (newItem, setIsUploadOpen) => {
    try {
      const cleanedItem = Object.fromEntries(Object.entries(newItem).filter(([_, v]) => v !== undefined && v !== null && v !== ''));
      await addDoc(collection(db, 'items'), { ...cleanedItem, createdAt: new Date().toISOString() });
      setIsUploadOpen(false);
      alert("הפריט הועלה בהצלחה לענן! 🚀");
    } catch (error) {
      alert("שגיאה בשמירת הפריט: " + error.message);
      setIsUploadOpen(false);
    }
  };

  const handleCloudDeleteItem = async (itemId) => {
    try {
      if (itemId && String(itemId).length > 10) await deleteDoc(doc(db, 'items', itemId));
      if (stateHandlers.handleDeleteMyItem) stateHandlers.handleDeleteMyItem(itemId);
      alert("הפריט נמחק בהצלחה! 🗑️");
    } catch (error) {
      if (stateHandlers.handleDeleteMyItem) stateHandlers.handleDeleteMyItem(itemId);
    }
  };

  const handleCloudUpdateItem = async (updatedItem) => {
    try {
      if (updatedItem?.id && String(updatedItem.id).length > 10) {
        await updateDoc(doc(db, 'items', updatedItem.id), {
          title: updatedItem.title, wanted: updatedItem.wanted,
          condition: updatedItem.condition, description: updatedItem.description
        });
      }
      if (stateHandlers.handleUpdateMyItem) stateHandlers.handleUpdateMyItem(updatedItem);
      alert("הפריט עודכן בהצלחה בענן! 🔄");
    } catch (error) {
      if (stateHandlers.handleUpdateMyItem) stateHandlers.handleUpdateMyItem(updatedItem);
    }
  };

  const handleCloudSendTradeOffer = async (myItem, targetItem, setTradeTargetItem) => {
    try {
      if (targetItem) {
        await addDoc(collection(db, 'trades'), {
          itemId: targetItem.id || '', itemTitle: targetItem.title || '', itemImage: targetItem.image || '',
          offeredItemTitle: myItem?.title || '', offeredItemImage: myItem?.image || '',
          status: 'ממתין', senderName: userProfile?.name || 'יובל לוי', createdAt: new Date().toISOString()
        });
        alert("הצעת החלפה נשלחה בהצלחה לענן! 🤝");
      }
      setTradeTargetItem(null);
    } catch (error) {
      if (stateHandlers.handleSendTradeOffer) stateHandlers.handleSendTradeOffer(myItem, targetItem);
    }
  };

  const handleCloudUpdateTradeStatus = async (tradeId, newStatus) => {
    try {
      if (tradeId && String(tradeId).length > 10) await updateDoc(doc(db, 'trades', tradeId), { status: newStatus });
      if (stateHandlers.handleUpdateTradeStatus) stateHandlers.handleUpdateTradeStatus(tradeId, newStatus);
    } catch (error) {
      if (stateHandlers.handleUpdateTradeStatus) stateHandlers.handleUpdateTradeStatus(tradeId, newStatus);
    }
  };

  const handleCloudSendMessage = async (tradeId, text) => {
    try {
      if (tradeId && text) {
        await addDoc(collection(db, 'messages'), {
          tradeId: tradeId, sender: userProfile?.name || 'יובל לוי', text: text, timestamp: new Date().toISOString()
        });
      }
      if (stateHandlers.handleSendMessage) stateHandlers.handleSendMessage(tradeId, text);
    } catch (error) {
      if (stateHandlers.handleSendMessage) stateHandlers.handleSendMessage(tradeId, text);
    }
  };

  const handleCloudReportItem = async (item) => {
    try {
      await addDoc(collection(db, 'reports'), {
        itemId: item.id || '', itemTitle: item.title || '', reportedBy: userProfile?.name || 'אנונימי', timestamp: new Date().toISOString()
      });
      alert('הדיווח נשלח בהצלחה למנהלי המערכת. 🛡️');
    } catch (error) {}
  };

  const handleCloudAddRating = async (ratingData) => {
    try {
      await addDoc(collection(db, 'ratings'), { ...ratingData, timestamp: new Date().toISOString() });
    } catch (error) {}
  };

  return {
    firestoreItems, firestoreTrades, firestoreMessages, firestoreRatings,
    handleCloudAddItem, handleCloudDeleteItem, handleCloudUpdateItem,
    handleCloudSendTradeOffer, handleCloudUpdateTradeStatus,
    handleCloudSendMessage, handleCloudReportItem, handleCloudAddRating
  };
}