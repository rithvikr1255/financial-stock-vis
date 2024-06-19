// src/utils/model.js
import * as tf from '@tensorflow/tfjs';

const prepareData = (historicalData) => {
    const dates = Object.keys(historicalData).reverse();
    const closingPrices = dates.map(date => parseFloat(historicalData[date]["4. close"]));

    const inputs = [];
    const outputs = [];

    for (let i = 0; i < closingPrices.length - 1; i++) {
        inputs.push([closingPrices[i]]);
        outputs.push(closingPrices[i + 1]);
    }

    return {
        inputs: tf.tensor2d(inputs),
        outputs: tf.tensor2d(outputs, [outputs.length, 1])
    };
};

export const trainModel = async (historicalData) => {
    const { inputs, outputs } = prepareData(historicalData);

    const model = tf.sequential();
    model.add(tf.layers.dense({ units: 50, activation: 'relu', inputShape: [1] }));
    model.add(tf.layers.dense({ units: 1 }));

    model.compile({ optimizer: 'adam', loss: 'meanSquaredError' });

    await model.fit(inputs, outputs, {
        epochs: 100,
        batchSize: 32,
        callbacks: tf.callbacks.earlyStopping({ patience: 10 })
    });

    return model;
};

export const makePrediction = (model, lastClosePrice) => {
    const input = tf.tensor2d([[lastClosePrice]]);
    const prediction = model.predict(input);
    return prediction.dataSync()[0];
};
