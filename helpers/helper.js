

const findById = (envelopes, envelopeId) => {
    const envelope = envelopes.find((item) => item.id === Number(envelopeId));
    if (!envelope) {
        console.log("Envelope not found");
    }
    return envelope;
}

const getIndexById = (id, elementList) => {
    return elementList.findIndex((element) => {
        return element.id === Number(id);
    });
};

module.exports = {
    findById,
    getIndexById
}