from abc import ABC, abstractmethod
from typing import List


class Observer(ABC):
    """Абстрактний спостерігач з інтерфейсом оновлення."""
    @abstractmethod
    def update(self, product_name: str, price: float) -> None:
        pass


class Subject(ABC):
    """Абстрактний суб'єкт із методами керування підписками."""
    def __init__(self):
        self._observers: List[Observer] = []

    def attach(self, observer: Observer) -> None:
        if observer not in self._observers:
            self._observers.append(observer)

    def detach(self, observer: Observer) -> None:
        self._observers.remove(observer)

    def notify(self) -> None:
        pass


class Product(Subject):
    """Конкретний товар, за ціною якого стежать клієнти."""
    def __init__(self, name: str, price: float):
        super().__init__()
        self._name = name
        self._price = price

    def set_price(self, new_price: float) -> None:
        if self._price != new_price:
            self._price = new_price
            print(f"\n[Товар] Ціна на {self._name} змінилася на {self._price} грн.")
            self.notify()

    def notify(self) -> None:
        for observer in self._observers:
            # Передача даних за моделлю Push (проштовхування)
            observer.update(self._name, self._price)


class Customer(Observer):
    """Конкретний спостерігач (клієнт)."""
    def __init__(self, name: str):
        self.name = name

    def update(self, product_name: str, price: float) -> None:
        print(f"[Сповіщення для {self.name}]: '{product_name}' тепер коштує {price} грн.")


if __name__ == "__main__":
    # Створення конкретного суб'єкта (Товар)
    gpu = Product("NVIDIA RTX 5090", 195000.0)

    # Створення трьох спостерігачів (Клієнти)
    ivan = Customer("Іван")
    olesya = Customer("Олеся")
    andrii = Customer("Андрій")

    print("--- Реєстрація підписників ---")
    gpu.attach(ivan)
    gpu.attach(olesya)
    gpu.attach(andrii)

    # Перша зміна ціни — сповіщення отримують усі три клієнти
    gpu.set_price(189000.0)

    print("\n--- Відключення одного підписника (Іван) ---")
    gpu.detach(ivan)

    # Друга зміна ціни — сповіщення отримують лише Олеся та Андрій
    gpu.set_price(185000.0)

    print("\n--- Додавання нового підписника (Марія) ---")
    mariya = Customer("Марія")
    gpu.attach(mariya)
    
    # Третя зміна ціни — сповіщення отримують Олеся, Андрій та Марія
    gpu.set_price(184500.0)