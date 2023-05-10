export type CreateShoppableServiceDTO = {
  id: string;
  // Attributes
  description?: string;
  group?: string;

  //Foreign keys
};

export type UpdateShoppableServiceDTO = CreateShoppableServiceDTO;
