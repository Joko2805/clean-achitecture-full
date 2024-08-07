interface Props {
  page?: number;
  limit?: number;
}

export class PaginationRequestDTO {
  private _page?: number;
  private _limit?: number;

  private constructor({ page, limit }: Props) {
    this._page = page;
    this._limit = limit;
  }

  static create(query: unknown): {
    isValid: boolean;
    instance?: PaginationRequestDTO;
  } {
    const { page, limit } = query as { page?: string; limit?: string };

    const validatedPage = this.validateNumber(page);
    const validatedLimit = this.validateNumber(limit);

    if (validatedPage === null || validatedLimit === null) {
      return {
        isValid: false,
      };
    }

    return {
      isValid: true,
      instance: new PaginationRequestDTO({
        page: validatedPage,
        limit: validatedLimit,
      }),
    };
  }

  private static validateNumber(
    value: string | undefined
  ): number | undefined | null {
    if (value === undefined) {
      return undefined;
    }

    const numberValue = Number(value);

    if (isNaN(numberValue) || numberValue <= 0) {
      return null;
    }

    return numberValue;
  }

  get page(): number | undefined {
    return this._page;
  }

  get limit(): number | undefined {
    return this._limit;
  }
}
