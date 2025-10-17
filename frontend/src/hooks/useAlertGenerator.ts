import { useState, useEffect } from 'react';

interface AlertConfig {
  assetName: string;
  volumeAmount: string;
  idValue: string;
  showMoreOptions: boolean;
  numTPs: number;
  tp1: number;
  tp2: number;
  tp3: number;
  tp4: number;
  tp5: number;
  tp6: number;
}

interface AlertMessages {
  longEntry: string;
  shortEntry: string;
  longExit?: string;
  shortExit?: string;
  [key: string]: string | undefined;
}

export const useAlertGenerator = () => {
  const [config, setConfig] = useState<AlertConfig>({
    assetName: '',
    volumeAmount: '',
    idValue: '',
    showMoreOptions: false,
    numTPs: 1,
    tp1: 100,
    tp2: 0,
    tp3: 0,
    tp4: 0,
    tp5: 0,
    tp6: 0,
  });

  // Auto-distribute TPs when number changes
  useEffect(() => {
    if (!config.showMoreOptions) {
      setConfig(prev => ({
        ...prev,
        tp1: 100,
        tp2: 0,
        tp3: 0,
        tp4: 0,
        tp5: 0,
        tp6: 0,
      }));
    } else {
      const equalShare = Math.floor(100 / config.numTPs);
      const remainder = 100 % config.numTPs;
      
      const tpValues: number[] = [];
      for (let i = 0; i < 6; i++) {
        if (i < config.numTPs) {
          tpValues[i] = equalShare + (i < remainder ? 1 : 0);
        } else {
          tpValues[i] = 0;
        }
      }
      
      setConfig(prev => ({
        ...prev,
        tp1: tpValues[0],
        tp2: tpValues[1],
        tp3: tpValues[2],
        tp4: tpValues[3],
        tp5: tpValues[4],
        tp6: tpValues[5],
      }));
    }
  }, [config.numTPs, config.showMoreOptions]);

  const generateAlertMessages = (): AlertMessages => {
    const ticker = config.assetName || '{{ticker}}';
    const qty = config.volumeAmount || '{{qty}}';
    const id = config.idValue || '{{id}}';
    
    const messages: AlertMessages = {
      longEntry: `D=Buy A=${ticker} Q=${qty} ID=${id}`,
      shortEntry: `D=Sell A=${ticker} Q=${qty} ID=${id}`,
    };

    if (!config.showMoreOptions) {
      messages.longExit = `X=Buy A=${ticker} P=100 ID=${id}`;
      messages.shortExit = `X=Sell A=${ticker} P=100 ID=${id}`;
    } else {
      const tpValues = [config.tp1, config.tp2, config.tp3, config.tp4, config.tp5, config.tp6];
      for (let i = 0; i < config.numTPs; i++) {
        if (tpValues[i] > 0) {
          messages[`longTp${i + 1}`] = `X=Buy A=${ticker} P=${tpValues[i]} ID=${id}`;
          messages[`shortTp${i + 1}`] = `X=Sell A=${ticker} P=${tpValues[i]} ID=${id}`;
        }
      }
    }

    return messages;
  };

  const updateConfig = (updates: Partial<AlertConfig>) => {
    setConfig(prev => ({ ...prev, ...updates }));
  };

  const copyToClipboard = async (message: string) => {
    try {
      await navigator.clipboard.writeText(message);
      return true;
    } catch (err) {
      console.error('Failed to copy alert message:', err);
      return false;
    }
  };

  return {
    config,
    updateConfig,
    generateAlertMessages,
    copyToClipboard,
  };
};