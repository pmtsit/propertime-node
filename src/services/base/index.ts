import {AxiosInstance} from 'axios';
import createDebug, {Debugger} from 'debug';
import {IDeleteResult} from '../../models/delete-result';

export default abstract class BaseService {
    protected readonly axios?: AxiosInstance;
    protected endpoint: string = '';

    private readonly debug: Debugger;

    protected constructor(axios: AxiosInstance, endpoint: string) {
        this.debug = createDebug('propertime-client');
        this.axios = axios;
        this.endpoint = endpoint;
    }

    public async delete(id: string): Promise<IDeleteResult> {
        if (!this.axios) {
            return {
                id,
                message: 'axios not initialized',
                result: false,
            };
        }

        const res = await this.axios
            .delete(`${this.endpoint}/${id}`);

        const result = res.data as IDeleteResult;

        if (result && result.result) {
            this.debug(`deleted the item with ${id}`);
        } else {
            this.debug(`item with ${id} not deleted - ${result ? result.message : 'unknown reason'}`);
        }

        return result;
    }

    protected async _list<T>(offset?: number, limit?: number): Promise<T[]> {
        if (!this.axios) {
            return [];
        }

        const items = await this.axios
            .get(this.endpoint, { params: {
                    limit,
                    offset,
                }})
            .then(res => res.data as T[])
            .catch(err => {
                this.debug(err);
                return [];
            });

        this.debug(`got ${items.length} items`);

        return items;
    }

    protected async _create<T>(req: any): Promise<T | null> {
        if (!this.axios) {
            return null;
        }

        const res = await this.axios
            .post(this.endpoint, req);

        const item = res.data as T;

        if (item) {
            this.debug(`created the item ${JSON.stringify(item)}`);
        } else {
            this.debug('item not created');
        }

        return item;
    }
}
