from sqlalchemy import create_engine, Column, Integer, String, ForeignKey, Float, DateTime, func, CheckConstraint, text, SmallInteger, Date, ARRAY
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import relationship, sessionmaker, joinedload
from datetime import datetime


Base = declarative_base()

class Customer(Base):
    __tablename__ = 'customers'
    customerid = Column(Integer, primary_key=True)
    firstname = Column(String(50))
    lastname = Column(String(50))
    email = Column(String(100))
    address = Column(String(255), nullable=True)
    password = Column(String(), nullable=False)
    baskets = relationship("Basket", back_populates="customer")

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

class Comments(Base):
    __tablename__ = 'comments'
    commentsid = Column(Integer, primary_key=True)
    productid = Column(Integer)
    customerid = Column(Integer, ForeignKey('customers.customerid'))
    text = Column(String())
    date = Column(DateTime, default=func.current_timestamp())
    customer = relationship("Customer", backref="comments")

class Basket(Base):
    __tablename__ = 'basket'
    customerid = Column(Integer, ForeignKey('customers.customerid'), primary_key=True)
    productids = Column(ARRAY(Integer), nullable=False)
    customer = relationship("Customer", back_populates="baskets")



SQLALCHEMY_DATABASE_URL = "postgresql://postgres:0@localhost/asteroid_shop"
engine = create_engine(SQLALCHEMY_DATABASE_URL)

Base.metadata.create_all(bind=engine)

SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)


def printCustomers():
    with SessionLocal() as session:
        customers = session.query(Customer).all()
        print("Список всех заказчиков:")
        for customer in customers:
            print(f"ID: {customer.customerid}, Имя: {customer.firstname}, Фамилия: {customer.lastname}, Эл. почта: {customer.email}")

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
    session.flush()  
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
            with session.begin():
                product_id = addProduct(session, name, description, price, weight, diameter, imglink, id)
                addComposition(session, *composition.split(','), product_id)
                session.commit()
    except:
        print(f"Error:")
        session.rollback()
        raise

def addNewComment(prodID, userID, text):
    with SessionLocal() as session:
        with session.begin():
            new_comment = Comments(
                productid=prodID,
                customerid=userID,
                text=text
            )
            session.add(new_comment)
            session.commit()

def addNewCustomer(firstname, lastname, email, password):
    with SessionLocal() as session:
        with session.begin(): 
            new_customer = Customer(
                firstname=firstname,
                lastname=lastname,
                email=email,
                password=password
            )
            session.add(new_customer)
            session.commit()
            return True




SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)
db = SessionLocal()


def getAllProducts():
    allProducts = []
    with SessionLocal() as session:
        products = session.query(Product).all()
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


async def getCustomerByEmail(email):
    with SessionLocal() as session:
        customer = session.query(Customer).filter(Customer.email == email).first()
        if customer:
            customer_dict = {
                "id": customer.customerid,
                "firstname": customer.firstname,
                "lastname": customer.lastname,
                "email": customer.email,
                "address": customer.address,
                "password": customer.password,
            }
            customer_dict = {k: (v if v is not None else '') for k, v in customer_dict.items()}
            return customer_dict
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


def format_datetime(date_str):
    dt = datetime.fromisoformat(date_str)
    formatted_date = dt.strftime('%d.%m.%Y %H:%M')
    return formatted_date


def getCommentsByProdID(product_id):
    allComments = []
    with SessionLocal() as session:
        comments = session.query(Comments).options(joinedload(Comments.customer)).filter(Comments.productid == product_id)
        
        for comment in comments:
            if comment.customer:
                customer_name = f"{comment.customer.firstname} {comment.customer.lastname}"
                comments_dict = {
                    "id": comment.commentsid,
                    "prodId": comment.productid,
                    "customerName": customer_name,
                    "text": comment.text,
                    "date": format_datetime(str(comment.date))
                }
                allComments.append(comments_dict)
        return allComments


def add_products_to_basket(customer_id: int, product_ids: list[int]):
    with SessionLocal() as session:
        basket = session.query(Basket).filter(Basket.customerid == customer_id).first()
        
        if basket:
            updated_productids = basket.productids.copy()
            updated_productids.extend(product_ids)
            basket.productids = updated_productids
        else:
            basket = Basket(customerid=customer_id, productids=product_ids)
            session.add(basket)
        
        session.commit()



def get_products_from_basket(customer_id):
    with SessionLocal() as session:
        basket = session.query(Basket).filter(Basket.customerid == customer_id).first()
        if basket:
            return basket.productids
        else:
            return []


def delete_product_from_basket(customer_id: int, product_id: int):
    with SessionLocal() as session:
        basket = session.query(Basket).filter(Basket.customerid == customer_id).first()
        if basket:
            try:
                updated_productids = [pid for pid in basket.productids if pid != product_id]
                basket.productids = updated_productids
                session.commit()
            except Exception as e:
                session.rollback()
                print(f"Error deleting product from basket: {e}")
                raise
        else:
            raise ValueError("Basket not found for the given customer_id")


def delete_basket(customer_id: int):
    with SessionLocal() as session:
        basket = session.query(Basket).filter(Basket.customerid == customer_id).first()
        if basket:
            try:
                session.delete(basket)
                session.commit()
            except Exception as e:
                session.rollback()
                print(f"Error deleting basket: {e}")
                raise
        else:
            raise ValueError("Basket not found for the given customer_id")

def change_user_name(customer_id: int, new_name: dict):
    with SessionLocal() as session:
        customer = session.query(Customer).filter(Customer.customerid == customer_id).first()
        if customer:
            try:
                customer.firstname = new_name.firstName
                customer.lastname = new_name.lastName
                session.commit()
            except Exception as e:
                session.rollback()
                print(f"Error changing user name: {e}")
                raise
        else:
            raise ValueError("Customer not found for the given customer_id")

def change_user_address(customer_id: int, new_address: dict):
    with SessionLocal() as session:
        customer = session.query(Customer).filter(Customer.customerid == customer_id).first()
        if customer:
            try:
                customer.address = new_address.address
                session.commit()
            except Exception as e:
                session.rollback()
                print(f"Error changing user address: {e}")
                raise
        else:
            raise ValueError("Customer not found for the given customer_id")
