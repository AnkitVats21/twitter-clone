from rest_framework.response import Response


class MetaDataResponse(Response):
    meta_data_dict = {"meta": "", "data": {}}

    def __init__(self, *args, **kwargs):
        if kwargs.get("error"):
            error = kwargs.pop("error")
            MetaDataResponse.meta_data_dict["data"] = {"error": error}
            MetaDataResponse.meta_data_dict["meta"] = error.get("type")
        else:
            if args:
                if args[0].get("error"):
                    MetaDataResponse.meta_data_dict["meta"] = {
                        **kwargs,
                        "msg": args[0]["error"],
                    }
                    MetaDataResponse.meta_data_dict["data"] = args[1]
                else:
                    MetaDataResponse.meta_data_dict["data"] = args[0]
                    if len(args) >= 2:
                        MetaDataResponse.meta_data_dict["meta"] = {
                            **kwargs,
                            "msg": args[1]
                            if args[1]
                            else "OK"
                            if kwargs["status"] == 200
                            else args[1],
                        }
        modified_args = tuple([MetaDataResponse.meta_data_dict])
        super().__init__(*modified_args, **kwargs)
