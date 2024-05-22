class Prompt:
    def process():
        pass

class ReceiptPrompt(Prompt):
    def __init__(self,  categories:list[str], ocr):
        self.ocr = ocr
        self.categories = categories

    def _preprocess(self, ocr) -> str:
        ocr = ocr[0]
        ocr_prompt_boxes = []
        for box in ocr:
            coords = box[0]
            text = box[1][0]
            ocr_prompt_boxes.append(f"(tl: {coords[0]}, br: {coords[2]}, text: {text})")
        
        return "\n".join(ocr_prompt_boxes)


        
    def process(self):
        return f"O sa-ti dau un bon cu diverse produse. Bonul contine mai multe informatii insa te rog sa extragi doar produsele. Informatiile sunt extrase printr-un ocr iar pozitiile fiecarei \
                bucatele de text sunt date prin urmatorul format (tp: [x,y] , br: [x,y], text: text) pe fiecare linie. \
                Te rog sa-mi clasifici in urmatoarele categorii produsele de pe bon {self.categories}  si sa mi le afisezi ca un json dupa urmatorul format\
                '{{'categorie':[{{'nume produs':'numele produsului', 'cantitate':'de cate ori a fost cumparat', 'pret':'pret per unitate'}}]}}'.\
                Urmeaza bucatele de text: {self._preprocess(self.ocr)}"
                
                
