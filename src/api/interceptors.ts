import axios, {CreateAxiosDefaults} from 'axios';
import {getAccessToken, removeTokenStorage} from "@/services/auth-token.service";
import {errorCatch} from "@/api/error";
import {authService} from "@/services/auth.service";

const options: CreateAxiosDefaults = {
    baseURL: 'http://195.151.1.151:3330/api/v1',
    headers: {
        "Content-Type": "application/json",
    },
    withCredentials: true,
}

const axiosClassic = axios.create(options)

const axiosWithAuth = axios.create(options)

axiosWithAuth.interceptors.request.use( config => {
    const accessToken = getAccessToken()

    if (config?.headers && accessToken)
        config.headers.Authorization = `Bearer ${accessToken}`
    return config
})

axiosWithAuth.interceptors.response.use(
    config => config,
    async error => {
        const originalRequest = error.config

        if ((error?.response?.status === 401 ||
            errorCatch(error === 'jwt expired'||
                errorCatch((error) === 'jwt must be provided') &&
        error.config &&
                !error.config._isRetry))) {
            originalRequest._isRetry = true
            try {
                await authService.getNewToken()
                return axiosWithAuth.request(originalRequest)
            } catch (error) {
                if (errorCatch(error) === 'jwt expired') removeTokenStorage()
            }
        }

        throw error
    }
)

export { axiosClassic, axiosWithAuth }