from sqlalchemy import create_engine, Column, Integer, String, ForeignKey, Float, DateTime, func, CheckConstraint, text, SmallInteger, Date
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import relationship, sessionmaker, joinedload
from datetime import datetime
#from datetime import datetime


# Создаем базовый класс для всех моделей
Base = declarative_base()

# Определяем модель для таблицы Customers
class Customer(Base):
    __tablename__ = 'customers'
    customerid = Column(Integer, primary_key=True)
    firstname = Column(String(50))
    lastname = Column(String(50))
    email = Column(String(100))
    address = Column(String(255))
    city = Column(String(100))
    postalcode = Column(String(20))
    country = Column(String(100))

# Определяем модель для таблицы Products
class Product(Base):
    __tablename__ = 'products'

    productid = Column(Integer, primary_key=True)
    name = Column(String(100), nullable=False)
    description = Column(String)
    price = Column(Integer, nullable=False)
    weight = Column(Float(precision=2))
    diameter = Column(Float(precision=1))
    category = Column(String(20))
    imglink = Column(String(255))

class Composition(Base):
    __tablename__ = 'composition'
    productid = Column(Integer, primary_key=True)
    iron = Column(SmallInteger)
    nickel = Column(SmallInteger)
    sulfur = Column(SmallInteger)
    magnesium = Column(SmallInteger)
    silicon = Column(SmallInteger)
    aluminum = Column(SmallInteger)
    calcium = Column(SmallInteger)
    oxygen = Column(SmallInteger)

from sqlalchemy.orm import relationship

class Comments(Base):
    __tablename__ = 'comments'
    commentsid = Column(Integer, primary_key=True)
    productid = Column(Integer)
    customerid = Column(Integer, ForeignKey('customers.customerid'))  # Ensure this is correct
    text = Column(String())
    date = Column(DateTime, default=func.current_timestamp())
    customer = relationship("Customer", backref="comments")  # This should link to the Customer model


# Создаем соединение с базой данных
SQLALCHEMY_DATABASE_URL = "postgresql://postgres:0@localhost/asteroid_shop"
engine = create_engine(SQLALCHEMY_DATABASE_URL)

# Создаем таблицы в базе данных
Base.metadata.create_all(bind=engine)

# Создаем сессию для работы с базой данных
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)

# Создаем нового заказчика
new_customer = Customer(
    firstname="John",
    lastname="Doe",
    email="john.doe@example.com",
    address="123 Main St",
    city="Anytown",
    postalcode="12345",
    country="USA"
)

# Добавляем нового заказчика в базу данных
# with SessionLocal() as session:
#     session.add(new_customer)
#     session.commit()

# Выводим список всех заказчиков
def printCustomers():
    with SessionLocal() as session:
        customers = session.query(Customer).all()
        print("Список всех заказчиков:")
        for customer in customers:
            print(f"ID: {customer.customerid}, Имя: {customer.firstname}, Фамилия: {customer.lastname}, Эл. почта: {customer.email}")

# def addProduct(id,name, description, price, weight,diameter, imglink):
#     new_product = Product(
#         productid=id,
#         name=name,
#         description=description,
#         price=price,
#         weight=weight,
#         diameter=diameter,
#         imglink = imglink
#     )
#     with SessionLocal() as session:
#         session.add(new_product)
#         session.commit()

# def addComposition(iron, nickel, sulfur, magnesium, silicon, aluminum, calcium, oxygen, id=0):
#     new_composition = Composition(
#         productid = id,
#         iron = iron,
#         nickel = nickel,
#         sulfur = sulfur,
#         magnesium = magnesium,
#         silicon = silicon,
#         aluminum = aluminum,
#         calcium = calcium,
#         oxygen = oxygen,
#     )
#     with SessionLocal() as session:
#         session.add(new_composition)
#         session.commit()

# def addNewProduct(id,name, description, price, weight,diameter, imglink,composition):
#     pass
    


def addProduct(session, name, description, price, weight, diameter, imglink, id=None):
    new_product = Product(
        name=name,
        description=description,
        price=price,
        weight=weight,
        diameter=diameter,
        imglink=imglink
    )
    if id:
        new_product.productid = id
    session.add(new_product)
    session.flush()  # This will generate the id if it was not provided
    return new_product.productid

def addComposition(session, iron, nickel, sulfur, magnesium, silicon, aluminum, calcium, oxygen, productid):
    new_composition = Composition(
        productid=productid,
        iron=iron,
        nickel=nickel,
        sulfur=sulfur,
        magnesium=magnesium,
        silicon=silicon,
        aluminum=aluminum,
        calcium=calcium,
        oxygen=oxygen,
    )
    session.add(new_composition)

def addNewProduct(name, description, price, weight, diameter, imglink, composition, id=None):
    try:
        with SessionLocal() as session:
            with session.begin():  # Start a transaction
                product_id = addProduct(session, name, description, price, weight, diameter, imglink, id)
                addComposition(session, *composition.split(','), product_id)
                session.commit()
    except:
        print(f"Error:")
        session.rollback()
        raise

def addNewComment(prodID, userID, text):
    with SessionLocal() as session:
        with session.begin():  # Start a transaction
            new_comment = Comments(
                productid=prodID,
                customerid=userID,
                text=text
            )
            session.add(new_comment)
            session.commit()


# Добавляем новый продукт в базу данных
# with SessionLocal() as session:
#     session.add(new_product)
#     session.commit()

# Создаем сессию для работы с базой данных
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)
db = SessionLocal()


def getAllProducts():
    allProducts = []
    with SessionLocal() as session:
        products = session.query(Product).all()
        # print("\nСписок всех продуктов:")
        for product in products:
            product_dict = {
                "id": product.productid,
                "title": product.name,
                "description": product.description,
                "price": product.price,
                "weight": product.weight,
                "diametgit": product.diameter,
                "category": product.category,
                "imgLink": product.imglink
            }
            allProducts.append(product_dict)
    return allProducts

def getProductByID(product_id):
    with SessionLocal() as session:
        product = session.query(Product).filter(Product.productid == product_id).first()
        if product:
            product_dict = {
                "id": product.productid,
                "title": product.name,
                "description": product.description,
                "price": product.price,
                "weight": product.weight,
                "diameter": product.diameter,
                "category": product.category,
                "imgLink": product.imglink
            }
            return product_dict
        else:
            return None


def getCompositionByID(product_id):
    with SessionLocal() as session:
        composition = session.query(Composition).filter(Composition.productid == product_id).first()
        if composition:
            composition_dict = {
                "id" : composition.productid,
                "iron" : composition.iron,
                "nickel" : composition.nickel,
                "sulfur" : composition.sulfur,
                "magnesium" : composition.magnesium,
                "silicon" : composition.silicon,
                "aluminum" : composition.aluminum,
                "calcium" : composition.calcium,
                "oxygen" : composition.oxygen
            }
            return composition_dict
        else:
            return None

# def getCommentsByProdID(product_id):
#     allComments = []
#     with SessionLocal() as session:
#         comments = session.query(Comments).filter(Comments.productid == product_id)
#         for comment in comments:
#             comments_dict = {
#                 "prodId" : comment.productid,
#                 "customerName" : comment.customerid,
#                 "text" : comment.text,
#                 "date" : comment.date
#             }
#             allComments.append(comments_dict)
#         return allComments

def format_datetime(date_str):
    # Парсим дату в формате ISO 8601
    dt = datetime.fromisoformat(date_str)
    # Форматируем дату в новом формате дд.мм.гггг чч:мм
    formatted_date = dt.strftime('%d.%m.%Y %H:%M')
    return formatted_date


def getCommentsByProdID(product_id):
    allComments = []
    with SessionLocal() as session:
        # Ensure you are using the relationship name 'customer'
        comments = session.query(Comments).options(joinedload(Comments.customer)).filter(Comments.productid == product_id)
        
        for comment in comments:
            # Check if comment.customer is not None to avoid AttributeError
            if comment.customer:
                customer_name = f"{comment.customer.firstname} {comment.customer.lastname}"
                comments_dict = {
                    "id": comment.commentsid,
                    "prodId": comment.productid,
                    "customerName": customer_name,  # Using the relationship to access customer details
                    "text": comment.text,
                    "date": format_datetime(str(comment.date))
                }
                allComments.append(comments_dict)
        return allComments





# def getCustomerById(customer_id):
#     with SessionLocal() as session:
#         customer = session.query(Composition).filter(Composition.productid == product_id).first()
#         if composition:
#             composition_dict = {
#                 "id" : composition.productid,
#                 "iron" : composition.iron,
#                 "nickel" : composition.nickel,
#                 "sulfur" : composition.sulfur,
#                 "magnesium" : composition.magnesium,
#                 "silicon" : composition.silicon,
#                 "aluminum" : composition.aluminum,
#                 "calcium" : composition.calcium,
#                 "oxygen" : composition.oxygen
#             }
#             return composition_dict
#         else:
#             return None


        
