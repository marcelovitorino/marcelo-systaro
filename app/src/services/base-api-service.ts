import { HttpClient } from "aurelia-fetch-client";
import { LogManager } from "aurelia-framework";
import { Logger } from "aurelia-logging";

export abstract class BaseApiService {
    private _logger: Logger = LogManager.getLogger("BaseApiService");

    constructor(protected readonly baseUrl: string, protected readonly httpClient: HttpClient) { }

    /**
     * Send a command to a certain endpoint with optional pagination parameters
     * @param endpoint
     * @param method
     * @param page
     * @param pageSize
     * @returns CommandExecutionResult
     */
    protected async sendCommand(endpoint: string, method: string, page?: number, pageSize?: number): Promise<SystaroPlain.CommandExecutionResult> {
        try {
            let url = this.baseUrl + endpoint;

            // Check if data is cached in localStorage
            const cacheKey = `${url}_${page}_${pageSize}`;
            const cachedData = this.getCachedData(cacheKey);

            if (cachedData) {
                return cachedData;
            }

            let response = await this.httpClient.fetch(url, {
                method: method,
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                }
            });
            
            let results = {} as SystaroPlain.CommandExecutionResult;
            let responseData = await response.json();
            
            results.success = true;
            
            if (page !== undefined && pageSize !== undefined) {
                const start = (page - 1) * pageSize;
                const paginatedItems = responseData.slice(start, start + pageSize);
                
                results.result = paginatedItems;
                results.totalItems = responseData.length;
                results.currentPage = page;
                results.totalPages = Math.ceil(responseData.length / pageSize);
            } else {
                results.result = responseData;
                results.totalItems = responseData.length;
                results.currentPage = 1;
                results.totalPages = 1;
            }

            // Cache data in localStorage
            this.cacheData(cacheKey, results);

            return results;
        } catch (errorResponse) {
            let result = { success: false } as SystaroPlain.CommandExecutionResult;
            try {
                let error = await errorResponse.json() as SystaroPlain.CommandExecutionResult;
                result = error;
                result.rawMessage = error.rawMessage;
            } catch (codeError) {
                result.rawMessage = errorResponse?.message ? errorResponse?.message : codeError;
            }
            this._logger.warn("CommandError: " + result.rawMessage);
            return result;
        }
    }

    /**
     * Get cached data from localStorage
     * @param key 
     * @returns CommandExecutionResult | null
     */
    private getCachedData(key: string): SystaroPlain.CommandExecutionResult | null {
        const cachedItem = localStorage.getItem(key);
        if (cachedItem) {
            const parsedItem = JSON.parse(cachedItem);
            const expiration = parsedItem.expiration;
            if (!expiration || expiration >= Date.now()) {
                return parsedItem.data;
            } else {
                localStorage.removeItem(key);
            }
        }
        return null;
    }

    /**
     * Cache data in localStorage
     * @param key 
     * @param data 
     */
    private cacheData(key: string, data: SystaroPlain.CommandExecutionResult): void {
        const cacheItem = {
            data: data,
            expiration: null 
        };
        localStorage.setItem(key, JSON.stringify(cacheItem));
    }
}
