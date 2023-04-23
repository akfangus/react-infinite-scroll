import React from "react";

interface Props {
  setPetType: (petType: string) => void;
  refetch: () => void;
}

// const queryClient = new QueryClient();

const Navbar: React.FC<Props> = ({ setPetType, refetch }): JSX.Element => {
  const HandlerPet = (pet: string): void => {
    setPetType(pet);
    // queryClient.invalidateQueries(["pets"]);
    refetch();
  };

  return (
    <div className="flex flex-col w-full my-1 gap-3">
      <button
        className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2  rounded-full focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-opacity-50 transition-colors duration-200"
        onClick={() => HandlerPet("dog")}
      >
        Dog
      </button>
      <button
        className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2  rounded-full focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-opacity-50 transition-colors duration-200"
        onClick={() => HandlerPet("cat")}
      >
        Cat
      </button>
    </div>
  );
};

export default Navbar;
