RECIEPT_EXTRACTION = """
1. Extract below infomation from the receipt:
    - Merchant: the name of the merchant
    - Date: date of the receipt in YYYY-MM-DD
    - Amount: total amount of the items without dollar sign
    - Category: either one of the following
        (Food, Transportation, Entertainment, Shopping, Other)
    - Note: a few words about the expense
2. You must reponse in json format.
3. If you could not find the information, you must specify "".
"""
