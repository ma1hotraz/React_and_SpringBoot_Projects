package com.notes.keep.model;

import java.util.HashSet;

import java.util.Set;

import jakarta.persistence.CascadeType;

import jakarta.persistence.Column;

import jakarta.persistence.Entity;

import jakarta.persistence.GeneratedValue;

import jakarta.persistence.GenerationType;

import jakarta.persistence.Id;

import jakarta.persistence.OneToMany;

import jakarta.persistence.Table;

@Entity

@Table(name = "DEPARTMENT")

public class Department {


    @Id

    @GeneratedValue(strategy = GenerationType.AUTO)

    @Column(name = "DEPTID")

    private int deptid;


    @Column(name = "DNAME")

    private String dname;


    @OneToMany(mappedBy = "department", cascade = CascadeType.ALL)

    private Set<Employee> employees = new HashSet<Employee>(0);


    public int getDeptid() {

        return this.deptid;

    }

    public void setDeptid(int deptid) {

        this.deptid = deptid;

    }

    public String getDname() {

        return this.dname;

    }

    public void setDname(String dname) {

        this.dname = dname;

    }

    public Set<Employee> getEmployees() {

        return this.employees;

    }

    public void setEmployees(Set<Employee> employees) {

        this.employees = employees;

    }

}

