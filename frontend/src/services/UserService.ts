interface User {
    id: string;
    name: string;
    email: string;
}

const mockUser: User = {
    id: '1',
    name: 'John Doe',
    email: 'john.doe@example.com',
};

export const getUserInfo = async (userId: string): Promise<User> => {
    // Simulação de um atraso para emular uma chamada de API
    // await new Promise((resolve) => setTimeout(resolve, 500));
    //
    // // Verifica se o userId é igual ao id do mockUser para retorno
    // if (userId === mockUser.id) {
    //     return mockUser;
    // } else {
    //     throw new Error('User not found');
    // }
    return mockUser
};
