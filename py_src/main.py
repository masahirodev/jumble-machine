import argparse
import os

import uvicorn
from fastapi import Depends, FastAPI, Header, HTTPException

import routers

app = FastAPI()
_environ = os.environ.copy()

#シークレットトークン
async def check_secret(secret_token: str = Header(None)) -> None:
    if (_environ.get("SECRET_TOKEN") and
            secret_token != _environ.get("SECRET_TOKEN")):
        raise HTTPException(status_code=401, detail="Secret Token invalid")


app.include_router(routers.router)


def init_argparse() -> argparse.ArgumentParser:
    parser = argparse.ArgumentParser(
        description="Launches the Python API",
    )
    parser.add_argument("--host", dest="host", default="127.0.0.1",
                        help="Bind socket to host. [default: %(default)s]")
    parser.add_argument("--port", dest="port", default=8000, type=int,
                        help="Bind socket to port. [default: %(default)s]")
    parser.add_argument("--log-level", dest="log_level", default="info",
                        choices=["critical", "error", "warning",
                                 "info", "debug", "trace"],
                        help="Log level. [default: %(default)s]")
    parser.add_argument("--secret", dest="secret", default=None,
                        help="Server secret token. [default: %(default)s]")
    return parser


if __name__ == "__main__":
    parser = init_argparse()
    args = parser.parse_args()

    if args.secret:
        _environ["SECRET_TOKEN"] = args.secret

    uvicorn.run(app, host=args.host, port=args.port,
                log_level=args.log_level)
