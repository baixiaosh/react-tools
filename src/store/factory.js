function factory($name, initState) {
  return (state = initState, { type, data }) => {
    if (type === $name) {
      state = data ? { ...state, ...data } : null;
    }
    return state;
  };
}

export default factory;
